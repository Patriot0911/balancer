import { IPlayer, IPlayerRoles } from "@/types";

const TEAM_PLAYER_REQ = 5;

const GLOBAL_COUNTS = {
    tank: 1,
    damage: 2,
    support: 2
};

interface IPairInfo {
    gap: number;
    player1Index: number;
    player2Index: number | null;
};

interface ITeamCounts {
    damage: number;
    tank: number;
    support: number;
};

const getCounts = (players: IPlayer[]): ITeamCounts => ({
    damage: players.filter(item => item.roles.damage).length,
    support: players.filter(item => item.roles.support).length,
    tank: players.filter(item => item.roles.tank).length
});

const sortCond = (pairA: IPairInfo, pairB: IPairInfo) => pairA.gap-pairB.gap;

const getClosestPairs = (players: IPlayer[], role: keyof IPlayerRoles, counts: ITeamCounts, ignoreRoles: (keyof IPlayerRoles)[]) => {
    const pairs: IPairInfo[] = [];
    const isAcceptableUser = (roles: IPlayerRoles, topRoles?: IPlayerRoles) => {
        const roleKeys = Object.keys(roles);
        for(let i = 0; i < roleKeys.length; i++) {
            const roleKey = roleKeys[i] as keyof IPlayerRoles;
            if(ignoreRoles.includes(roleKey))
                continue;
            if(!roles[roleKey])
                continue;
            const roleQuota = (topRoles && topRoles[roleKey] ? 2 : 1)*GLOBAL_COUNTS[roleKey];
            if(counts[roleKey]-roleQuota < GLOBAL_COUNTS[roleKey]*2)
                return false;
        };
        return true;
    };
    for(let i = 0; i < players.length; i++) {
        const curPlayer = players[i];
        if(!curPlayer.roles[role])
            continue;
        if(!isAcceptableUser(curPlayer.roles))
            continue;
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
            if(!isAcceptableUser(subPlayer.roles, curPlayer.roles))
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
    if(pairs.length < 1)
        return;
    const pairsWithoutRepeat = pairs.filter((pair, pairIndex) =>
        pair.player1Index !== pairs.find(
            (item, index) => item.player1Index === pair.player2Index && pairIndex < index
        )?.player2Index
    );
    const resPairs = pairsWithoutRepeat.filter((pair, pairIndex) => {
        const snakePair = pairsWithoutRepeat.find(
            (item, index) => pair.player1Index === item.player2Index
        );
        return !snakePair || snakePair.gap > pair.gap;
    });
    return resPairs;
};

const balanceByPair = (players: IPlayer[], teamCount = 2) => {
    if(players.length < TEAM_PLAYER_REQ*teamCount || teamCount % 2 !== 0)
        return;
    const initCounts: ITeamCounts = getCounts(players);
    if(
        initCounts.tank < GLOBAL_COUNTS.tank*teamCount ||
        initCounts.support < GLOBAL_COUNTS.support*teamCount ||
        initCounts.damage < GLOBAL_COUNTS.damage*teamCount
    )
        return;
    const teams: any[] = []; // improve
    for(let i = 0; i < teamCount; i++) {
        const teamInfo = {
            tank: new Array(GLOBAL_COUNTS.tank) as IPlayer[],
            damage: new Array(GLOBAL_COUNTS.damage) as IPlayer[],
            support: new Array(GLOBAL_COUNTS.support) as IPlayer[],
            score: 0
        };
        teams.push(teamInfo);
    };
    let curPlayers = [...players];
    const pushRolesToTeams = (role: keyof IPlayerRoles, pairs: IPairInfo[]) => {
        const usedIndeces: number[] = [];
        for(let i = 0, k = 0; i < teamCount/2; i++, k+=2) {
            const { player1Index, player2Index } = pairs[i];
            const firstPlayer = curPlayers[player1Index];
            const secondPlayer = curPlayers[player2Index!];
            teams[k][role].push(firstPlayer);
            teams[k].score += firstPlayer.roles[role]!.rankValue;
            teams[k+1][role].push(secondPlayer);
            teams[k+1].score += secondPlayer.roles[role]!.rankValue;
            usedIndeces.push(player1Index, player2Index!);
        };
        return usedIndeces;
    };
    const ignoreRoles: (keyof IPlayerRoles)[] = [];
    for(const role of Object.keys(GLOBAL_COUNTS)) {
        const roleKey = role as keyof IPlayerRoles;
        ignoreRoles.push(roleKey);
        for(let i = 0; i < GLOBAL_COUNTS[roleKey]; i++) {
            console.log(roleKey + ' ' + i);
            const counts = getCounts(curPlayers);
            const pairs = getClosestPairs(curPlayers, roleKey, counts, ignoreRoles);
            // console.log(pairs);
            if(!pairs || pairs.length < teamCount/2)
                return;
            const sourtedPairs = pairs.sort(sortCond);
            const usedIndeces = pushRolesToTeams(roleKey, sourtedPairs);
            curPlayers = curPlayers.filter((item, index) => !usedIndeces.includes(index));
            // console.log(curPlayers);
        };
    };
    console.log(teams);
};

export default balanceByPair;
