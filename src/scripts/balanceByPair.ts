import {
    IPairInfo,
    IPlayer,
    IPlayerRoles,
    ITeamCounts,
    ITeamInfo,
    Role,
} from "@/types";

const TEAM_ROLES_COUNT = {
    tank: 1,
    damage: 2,
    support: 2
};

const TEAM_PLAYERS_COUNT = Object.values(TEAM_ROLES_COUNT)
    .reduce((total, count) => total + count, 0);

const getRolesCount = (players: IPlayer[], role: Role) => 
    players.filter((player) => player.roles[role]).length;

const getRolesCounts = (players: IPlayer[]): ITeamCounts => ({
    damage: getRolesCount(players, Role.Damage),
    support: getRolesCount(players, Role.Support),
    tank: getRolesCount(players, Role.Tank)
});

const isAcceptableUser = (
    players: IPlayer[],
    role: keyof IPlayerRoles,
    counts: ITeamCounts,
    ignoreRoles: (keyof IPlayerRoles)[],
    roles: IPlayerRoles,
    topRoles?: IPlayerRoles
) => {
    const roleKeys = Object.keys(roles);
    for(let i = 0; i < roleKeys.length; i++) {
        const roleKey = roleKeys[i] as keyof IPlayerRoles;
        if(ignoreRoles.includes(roleKey))
            continue;
        if(!roles[roleKey])
            continue;
       if(role === 'tank') {
            const supportAndDamageCount = players.filter((player) => player.roles.support && player.roles.damage).length;
            if(
                supportAndDamageCount - counts.support < TEAM_ROLES_COUNT.support ||
                supportAndDamageCount - counts.damage < TEAM_ROLES_COUNT.damage
            )
                return false;
        }
        const roleQuota = (topRoles && topRoles[roleKey] ? 2 : 1);
        if(counts[roleKey]-roleQuota < TEAM_ROLES_COUNT[roleKey]*2)
            return false;
    };
    return true;
};

export const pairPlayers = (players: IPlayer[], role: keyof IPlayerRoles, counts: ITeamCounts, ignoreRoles: (keyof IPlayerRoles)[]) => {
    const pairs: IPairInfo[] = [];
    for(let i = 0; i < players.length; i++) {
        const curPlayer = players[i];
        if(!curPlayer.roles[role])
            continue;
        if(!isAcceptableUser(
            players,
            role,
            counts,
            ignoreRoles,
            curPlayer.roles
        )) {
            continue;
        }
        const pairInfo: IPairInfo = {
            gap: Number.MAX_SAFE_INTEGER,
            player1Index: i,
            player2Index: null
        };
        const rankValue = curPlayer.roles[role]!.rankValue;
        for(let k = 0; k < players.length; k++) {
            if(i === k)
                continue;
            const subPlayer = players[k];
            if(!subPlayer.roles[role])
                continue;
            if(!isAcceptableUser(
                players,
                role,
                counts,
                ignoreRoles,
                subPlayer.roles,
                curPlayer.roles
            ))
                continue;
            const subRankValue = subPlayer.roles[role]!.rankValue;
            const gap = Math.abs(rankValue - subRankValue);
            if(pairInfo.gap > gap) {
                pairInfo.gap = gap;
                pairInfo.player2Index = k;
            };
        };
        if(pairInfo.player2Index !== null)
            pairs.push(pairInfo);
    }
    return pairs;
};

export const getClosestPairs = (players: IPlayer[], role: keyof IPlayerRoles, counts: ITeamCounts, ignoreRoles: (keyof IPlayerRoles)[]) => {
    const pairs = pairPlayers(players, role, counts, ignoreRoles);
    if(pairs.length < 1)
        return;
    const pairsWithoutRepeat = pairs.filter((pair, pairIndex) =>
        pair.player1Index !== pairs.find(
            (item, index) => item.player1Index === pair.player2Index && pairIndex < index
        )?.player2Index
    );
    const resPairs = pairsWithoutRepeat.filter(pair => {
        const snakePair = pairsWithoutRepeat.find(
            item => pair.player1Index === item.player2Index
        );
        return !snakePair || snakePair.gap > pair.gap;
    });
    return resPairs;
};

const addPlayerToTeam = (team: ITeamInfo, player: IPlayer, role: Role): void => {
    const rolePlayers = team[role];
    rolePlayers.push(player);
    const { rankValue } =  player.roles[role]!
    team.score += rankValue;
};

/**
 * @returns Array of added players indexes
 */
const addToTeams = (
    players: IPlayer[],
    teams: ITeamInfo[],
    pairs: IPairInfo[],
    role:Role
): number[] => {
    const added: number[] = [];
    for (let i = 0, k = 0; i < teams.length / 2; i++, k += 2) {
        const pair = pairs[i];
        const { player1Index, player2Index } = pair;
        const firstPlayer = players[player1Index];
        const secondPlayer = players[player2Index!];
        const firstTeam = teams[k];
        const secondTeam = teams[k + 1];
        addPlayerToTeam(firstTeam, firstPlayer, role)
        addPlayerToTeam(secondTeam, secondPlayer, role);
        added.push(player1Index, player2Index!);
    }
    return added;
};

const initTeam = (): ITeamInfo => ({
    tank: [],
    damage: [],
    support: [],
    score: 0
});

const initTeams = (teamCount: number): ITeamInfo[] => 
    Array.from({ length: teamCount }).map(initTeam);

export const validateInput = (
    input: IPlayer[],
    teamsCount: number,
    initCounts = getRolesCounts(input),
): boolean => (
    teamsCount % 2 === 0 &&
    input.length >= TEAM_PLAYERS_COUNT * teamsCount &&
    initCounts.tank >= TEAM_ROLES_COUNT.tank * teamsCount &&
    initCounts.support >= TEAM_ROLES_COUNT.support * teamsCount &&
    initCounts.damage >= TEAM_ROLES_COUNT.damage * teamsCount
);

export const balanceByPair = (
    input: IPlayer[],
    teamsCount = 2
): ITeamInfo[] | undefined => {
    const isValid = validateInput(input, teamsCount);
    if (!isValid) return;
    const players = [...input];
    const ignoredRoles: Role[] = [];
    const teams = initTeams(teamsCount);
    const minPairsCount = teamsCount / 2;
    for (const role of Object.values(Role)) {
        ignoredRoles.push(role);
        for (let i = 0; i < TEAM_ROLES_COUNT[role]; i++) {
            const counts = getRolesCounts(players);
            const pairs = getClosestPairs(players, role, counts, ignoredRoles);
            if (!pairs || pairs.length < minPairsCount) return;
            const sortedPairs = pairs.sort((pairA, pairB) => pairA.gap - pairB.gap);
            const added = addToTeams(players, teams, sortedPairs, role);
            added.forEach((index) => players.splice(index, 1));
        }
    }
    return teams;
};
