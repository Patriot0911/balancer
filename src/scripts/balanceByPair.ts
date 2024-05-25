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
) => (roles: IPlayerRoles, topRoles?: IPlayerRoles): boolean => {
    if (!roles[role]) return false;
    const roleKeys = Object.keys(roles);
    for (let i = 0; i < roleKeys.length; i++) {
        const roleKey = roleKeys[i] as keyof IPlayerRoles;
        if (ignoreRoles.includes(roleKey))
            continue;
        if (!roles[roleKey])
            continue;
        if (role === 'tank') {
            const supportAndDamageCount = players.filter((player) => player.roles.support && player.roles.damage).length;
            if (
                supportAndDamageCount - counts.support < TEAM_ROLES_COUNT.support ||
                supportAndDamageCount - counts.damage < TEAM_ROLES_COUNT.damage
            )
                return false;
        }
        const roleQuota = (topRoles && topRoles[roleKey] ? 2 : 1);
        if (counts[roleKey] - roleQuota < TEAM_ROLES_COUNT[roleKey] * 2)
            return false;
    };
    return true;
};

const initPair = (player1Index: number): IPairInfo => ({
    gap: Number.MAX_SAFE_INTEGER,
    player1Index,
    player2Index: -1
});

export const pairPlayers = (
    players: IPlayer[],
    counts: ITeamCounts,
    ignoreRoles: Role[],
    role: Role,
): IPairInfo[] => {
    const pairs: IPairInfo[] = [];
    const isValid = isAcceptableUser(
        players,
        role,
        counts,
        ignoreRoles,
    );
    for (let player1Index = 0; player1Index < players.length; player1Index++) {
        const player1 = players[player1Index];
        if (!isValid(player1.roles)) continue;
        const pair = initPair(player1Index);
        const player1Rank = player1.roles[role]!.rankValue;
        for (let player2Index = 0; player2Index < players.length; player2Index++) {
            if (player1Index === player2Index) continue;
            const player2 = players[player2Index];
            if (!isValid(player2.roles, player1.roles)) continue;
            const player2Rank = player2.roles[role]!.rankValue;
            const gap = Math.abs(player1Rank - player2Rank);
            if (pair.gap > gap) Object.assign(pair, { gap, player2Index });
        }
        if (pair.player2Index !== -1) pairs.push(pair);
    }
    return pairs;
};

export const getClosestPairs = (
    players: IPlayer[],
    counts: ITeamCounts,
    ignoredRoles: Role[],
    role: Role,
): IPairInfo[] => {
    const pairs = pairPlayers(players, counts, ignoredRoles, role);
    const unique = pairs.filter((pair, pairIndex) => {
        const transcendent = pairs.find((item, index) =>
            item.player1Index === pair.player2Index && pairIndex < index
        );
        return pair.player1Index !== transcendent?.player2Index
    });
    const res = unique.filter((pair) => {
        const snakePair = unique.find((item) =>
            pair.player1Index === item.player2Index
        );
        return !snakePair || snakePair.gap > pair.gap;
    });
    return res;
};

const addPlayerToTeam = (team: ITeamInfo, player: IPlayer, role: Role): void => {
    const rolePlayers = team[role];
    rolePlayers.push(player);
    const { rankValue } = player.roles[role]!
    team.score += rankValue;
};

/**
 * @returns Array of added players indexes
 */
const addToTeams = (
    players: IPlayer[],
    teams: ITeamInfo[],
    pairs: IPairInfo[],
    role: Role
): number[] => {
    const added: number[] = [];
    for (let i = 0, k = 0; i < teams.length / 2; i++, k += 2) {
        const pair = pairs[i];
        const { player1Index, player2Index } = pair;
        const player1 = players[player1Index];
        const player2 = players[player2Index];
        const team1 = teams[k];
        const team2 = teams[k + 1];
        addPlayerToTeam(team1, player1, role)
        addPlayerToTeam(team2, player2, role);
        added.push(player1Index, player2Index);
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
            const pairs = getClosestPairs(players, counts, ignoredRoles, role);
            if (pairs.length < minPairsCount) return;
            const sorted = pairs.sort((pairA, pairB) => pairA.gap - pairB.gap)
            const added = addToTeams(players, teams, sorted, role);
            added.forEach((index) => players.splice(index, 1));
        }
    }
    return teams;
};
