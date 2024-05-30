import {
    IPairInfo,
    IPlayer,
    IPlayerRoles,
    ITeamCounts,
    ITeamInfo,
    ITeamPairInfo,
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
    [Role.Damage]: getRolesCount(players, Role.Damage),
    [Role.Support]: getRolesCount(players, Role.Support),
    [Role.Tank]: getRolesCount(players, Role.Tank)
});

const isAcceptablePlayer = (
    players: IPlayer[],
    counts: ITeamCounts,
    ignoredRoles: Role[],
    role: Role,
) => (roles: IPlayerRoles, topRoles?: IPlayerRoles): boolean => {
    if (!roles[role]) return false;
    for (const roleKey of Object.values(Role)) {
        if (ignoredRoles.includes(roleKey) || !roles[roleKey]) continue;
        /*
         * Загальна ідея була у валідації кількості гравців з різними ролями
         * зважаючи на те, що наша валідація починається з танка - то ми використовуємо саме такий спосіб перевірки
         * проте якби ми починали не з танка - то цей шматок коду не давав би занадто багато
         * To Rework  |
         *           \/
        */
        if (role === Role.Tank) {
            const supportAndDamageCount = players.filter((player) =>
                player.roles[Role.Support] && player.roles[Role.Damage]
            ).length;
            const supportsLack = supportAndDamageCount - counts[Role.Support] < TEAM_ROLES_COUNT[Role.Support]
            const damagersLack = supportAndDamageCount - counts[Role.Damage] < TEAM_ROLES_COUNT[Role.Damage]
            if (supportsLack || damagersLack) return false;
        }
        const roleQuota = topRoles && topRoles[roleKey] ? 2 : 1;
        const available = counts[roleKey] - roleQuota;
        const required = TEAM_ROLES_COUNT[roleKey] * 2;
        if (available < required) return false;
    }
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
    ignoredRoles: Role[],
    role: Role,
): IPairInfo[] => {
    const pairs: IPairInfo[] = [];
    const isValid = isAcceptablePlayer(
        players,
        counts,
        ignoredRoles,
        role,
    );
    for (let player1Index = 0; player1Index < players.length; player1Index++) {
        const usedPlayerIndexes: number[] = [];
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
            if (
                pair.gap > gap
            ) Object.assign(pair, { gap, player2Index });
        }
        if (pair.player2Index !== -1) {
            pairs.push(pair);
            usedPlayerIndexes.push(pair.player1Index, pair.player2Index);
        }
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
            (item.player1Index === pair.player2Index)
            && pairIndex < index
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
    const { rankValue } = player.roles[role]!;
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

const isValidRoleCount = (
    role: Role,
    teamsCount: number,
    counts: ITeamCounts,
) => counts[role] >= TEAM_ROLES_COUNT[role] * teamsCount;

export const validateInput = (
    input: IPlayer[],
    teamsCount: number,
    initCounts = getRolesCounts(input),
): boolean => {
    const isValidTeamsSize = input.length >= TEAM_PLAYERS_COUNT * teamsCount;
    return (
        teamsCount % 2 === 0 &&
        isValidTeamsSize &&
        isValidRoleCount(Role.Tank, teamsCount, initCounts) &&
        isValidRoleCount(Role.Support, teamsCount, initCounts) &&
        isValidRoleCount(Role.Damage, teamsCount, initCounts)
    );
};

export const balanceByPair = (
    input: IPlayer[],
    teamsCount = 2
): ITeamInfo[] | undefined => {
    const isValid = validateInput(input, teamsCount);
    if (!isValid) return;
    const players = [...input];
    const ignoredRoles: Role[] = [];
    const teams = initTeams(teamsCount);
    const teamPairsCount = teamsCount / 2;
    for (const role of Object.values(Role)) {
        ignoredRoles.push(role);
        const testFunc = () => {
            const counts = getRolesCounts(players);
            const pairs = getClosestPairs(players, counts, ignoredRoles, role);
            if (pairs.length < teamPairsCount) return;
            const sorted = pairs.sort((pairA, pairB) => pairA.gap - pairB.gap)
            const added = addToTeams(players, teams, sorted, role);
            added.forEach((index) => players.splice(index, 1));
            return added;
        };
        for (
            let addedCount = 0; addedCount/TEAM_ROLES_COUNT[role] < TEAM_ROLES_COUNT[role]*teamPairsCount*2;
        ) {
            const addRes = testFunc();
            if(!addRes) {
                if(addedCount/TEAM_ROLES_COUNT[role] < 2) {
                    throw Error(`Not enough ${role} players`);
                };
                break;
            };
            addedCount += addRes.length;
        };
    }
    return teams;
};
