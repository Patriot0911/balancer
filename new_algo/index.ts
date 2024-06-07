import { IPlayer, IPlayerRoles, Role } from "@/types";

interface ITeamRolesCount {
    [Role.Damage]:      number;
    [Role.Support]:     number;
    [Role.Tank]:        number;
};

const defaultRolesCount: ITeamRolesCount = {
    [Role.Tank]: 1,
    [Role.Damage]: 2,
    [Role.Support]: 2,
};

const getPlayersWith = (players: IPlayer[], role: Role) => players.filter(
    player => player.roles[role]
);

const isValidRolesCount = (players: IPlayer[], rolesQuota: number, teamCount: number, role: Role) => {
    const playersWithRoleCount = getPlayersWith(players, role).length;
    return playersWithRoleCount >= rolesQuota * teamCount;
};

const isValidInit = (players: IPlayer[], rolesCount: ITeamRolesCount, teamCount: number) => {
    const rolesKeys = (Object.keys(rolesCount) as Role[]);
    for(const roleKey of rolesKeys) {
        const key = roleKey as Role;
        if(
            !isValidRolesCount(players, rolesCount[key], teamCount, key)
        )
            throw new Error(`No enough players for '${key}'`);
    };
    return true;
};

interface IRoleQuotaInfo {
    [Role.Damage]: number;
    [Role.Support]: number;
    [Role.Tank]: number;
};

const isValidPlayersSet = (players: IPlayer[], roleQuota: IRoleQuotaInfo, ignoredRoles: Role[]) => {
    for(const role of Object.keys(Role)) {
        const loweredRole = role.toLowerCase() as Role;
        const isIgnorredRole = ignoredRoles.includes(loweredRole);
        if(isIgnorredRole || !roleQuota[loweredRole])
            continue;
        const isValidSet = isValidRolesCount(players, roleQuota[loweredRole], 1, loweredRole);
        if(!isValidSet)
            return false;
    };

    if(ignoredRoles.length < 1) {
        const rolesKeys = Object.keys(Role).filter(
            k => k !== 'Tank'
        ) as Role[];
        const playersWithRole1Count = getPlayersWith(players, rolesKeys[0].toLowerCase() as Role);
        const playersWithRole2Count = getPlayersWith(players, rolesKeys[1].toLowerCase() as Role).length;
        const doubleRoleCount = players.filter(
            (pl) => pl.roles[rolesKeys[0].toLowerCase() as Role] && pl.roles[rolesKeys[1].toLowerCase() as Role]
        );
        const role1Lack = playersWithRole1Count.length - doubleRoleCount.length < roleQuota[rolesKeys[0].toLowerCase() as Role];
        const role2Lack = playersWithRole2Count - doubleRoleCount.length < roleQuota[rolesKeys[1].toLowerCase() as Role];
        if(role1Lack && role2Lack)
            return false;
    };

    return true;
};

interface IPairInfo {
    player1: IPlayer;
    player2?: IPlayer;
    gap: number;
};

const initPair = (player1: IPlayer): IPairInfo => {
    return {
        player1,
        gap: Number.MAX_SAFE_INTEGER,
    };
};

const getGap = (player1: IPlayer, player2: IPlayer, role: Role) => {
    if(!player1.roles[role] || !player2.roles[role])
        throw new Error('Gap callculation error');
    return Math.abs(player1.roles[role]!.rankValue - player2.roles[role]!.rankValue);
};

interface ITeamInfo {
    [Role.Tank]: IPlayer[];
    [Role.Damage]: IPlayer[];
    [Role.Support]: IPlayer[];
    score: number;
};

const balanceInit = (
    inputPlayers: IPlayer[],
    teamCount = 2,
    rolesCount = defaultRolesCount,
) => {
    if(!isValidInit(inputPlayers, rolesCount, teamCount))
        return;
    let players = [...inputPlayers];
    const rolesKeys = (Object.keys(rolesCount) as Role[]);
    const ignoredRoles: Role[] = rolesKeys.filter(
        key => (!rolesCount[key as Role] || rolesCount[key as Role] <= 0)
    );
    const resTeamsList: ITeamInfo[] = new Array(teamCount).fill({
        [Role.Damage]: new Array(rolesCount[Role.Damage]),
        [Role.Support]: new Array(rolesCount[Role.Support]),
        [Role.Tank]: new Array(rolesCount[Role.Tank]),
        score: 0,
    });
    console.log(resTeamsList);
    for(const role of rolesKeys) {
        console.log(role);
        if(ignoredRoles.includes(role)) continue;
        const roleQuota = rolesCount[role] * teamCount;
        for(let added = 0; added < roleQuota;) {
            const rolledPlayers = players.filter(
                pl => pl.roles[role]
            );
            if(rolledPlayers.length < roleQuota-added)
                throw new Error(`No enough players for '${role}'`);
            const pairsList: IPairInfo[] = [];
            const validationRoleQuota: IRoleQuotaInfo = {
                [Role.Tank]: 0,
                [Role.Damage]: 0,
                [Role.Support]: 0,
            };
            for(const subRole of Object.keys(Role)) {
                const subRoleKey = subRole.toLowerCase() as Role;
                if(ignoredRoles.includes(subRoleKey)) {
                    Object.assign(validationRoleQuota, { [subRoleKey]: 0, });
                    continue;
                }
                if(role === subRoleKey) {
                    Object.assign(validationRoleQuota, { [subRoleKey]: roleQuota-added-2, }); // -2 ?
                    continue;
                };
                Object.assign(validationRoleQuota, { [subRoleKey]: rolesCount[subRoleKey]*teamCount, });
            };
            for(const player1 of rolledPlayers) {
                const withoutPl1 = players.filter(
                    i => i.name !== player1.name
                );
                const isValidSet = isValidPlayersSet(withoutPl1, validationRoleQuota, ignoredRoles);
                if(!isValidSet)
                    continue;
                const pair = initPair(player1);
                for(const player2 of rolledPlayers) {
                    if(player1.name === player2.name)
                        continue;
                    const withoutBoth = withoutPl1.filter(
                        i => i.name !== player2.name
                    );
                    const isValidSetBoth = isValidPlayersSet(withoutBoth, validationRoleQuota, ignoredRoles);
                    if(!isValidSetBoth)
                        continue;
                    const newGap = getGap(player1, player2, role);
                    if(newGap >= pair.gap) {
                        continue;
                    }
                    Object.assign(pair, {
                        player2,
                        gap: newGap
                    });
                };
                if(!pair.player2)
                    continue;
                pairsList.push(pair);
            };
            if(pairsList.length < 1)
                throw new Error(`No enough players for '${role}'`);
            const sortedPairs = pairsList.sort(
                (pairA, pairB) => pairA.gap - pairB.gap
            );
            const firstPair = sortedPairs[0];
            players = players.filter(
                i => i.name !== firstPair.player1.name && i.name !== firstPair.player2?.name
            );
            added += 2;
            console.log(firstPair);
            if(resTeamsList[0].score > resTeamsList[1].score) {
                resTeamsList[1][role].push(firstPair.player1);
                resTeamsList[0][role].push(firstPair.player2 as IPlayer);


                resTeamsList[1].score += firstPair.player1.roles[role]!.rankValue;
                resTeamsList[0].score += firstPair.player2!.roles[role]!.rankValue;
            } else {
                resTeamsList[0][role].push(firstPair.player1);
                resTeamsList[1][role].push(firstPair.player2 as IPlayer);

                resTeamsList[0].score += firstPair.player1.roles[role]!.rankValue;
                resTeamsList[1].score += firstPair.player2!.roles[role]!.rankValue;
            };
        };
        ignoredRoles.push(role);
    };
    return resTeamsList;
};

export default balanceInit;
