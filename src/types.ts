import { ButtonHTMLAttributes, ImgHTMLAttributes, InputHTMLAttributes, Ref } from "react";

export enum OverwatchRoles {
    TANK = 0,
    DAMAGE = 1,
    SUPPORT = 2
};

export enum Role {
    Tank = 'tank',
    Damage = 'damage',
    Support = 'support'
};

export interface IPlayerRoles {
    [Role.Tank]?: IProdRankData;
    [Role.Damage]?: IProdRankData;
    [Role.Support]?: IProdRankData;
};

export interface IPlayer {
    name: string;
    roles: IPlayerRoles;
};

export interface IErrorInfoProps {
    text: string;
}

export type TClassicButton = {
    text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type TInputFieldProps = {
    label: string;
    name: string;
    ref?: Ref<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

export interface IInitialState {
    value: IPlayer[];
};

export interface IRank {
    name: string;
    begin: number;
    step: number;
    replaces: string[];
};

export interface ISimpleRankData {
    str: string;
    value: number;
};
export interface IProdRankData {
    rankName: string;
    rankValue: number;
};

export interface IPlayerRoleProps extends IProdRankData {
    index: number;
};

export interface ITeamProps {
    teamInfo?: ITeamInfo;
    name: string;
};

export interface IRoleImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    rolename: OverwatchRoles;
};
export interface ITeamPlayerProps {
    player?: IPlayer;
    roleId: OverwatchRoles;
};
export interface IRoleContainerProps {
    roleId: OverwatchRoles;
};

export interface ITeamPairInfo {
    teamA: ITeamInfo;
    teamB: ITeamInfo;
}

export interface ITeamInitialState {
    value: ITeamInfo[];
}

export interface ITeamInfo {
    tank: IPlayer[];
    damage: IPlayer[];
    support: IPlayer[];
    score: number;
};

export interface IPlayersListProps {
    players: IPlayer[];
};

export interface IBalanceActionsProps {
    players: IPlayer[]
};

export interface IPairInfo {
    gap: number;
    player1Index: number;
    player2Index: number;
};

export interface ITeamCounts {
    damage: number;
    tank: number;
    support: number;
};

export interface ITeamPlayerListProps {
    teamInfo: ITeamInfo;
};
