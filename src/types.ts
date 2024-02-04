import { ButtonHTMLAttributes, ImgHTMLAttributes, InputHTMLAttributes, Ref } from "react";

export enum OverwatchRoles {
    TANK = 0,
    DAMAGE = 1,
    SUPPORT = 2
};

export interface IPlayer {
    name: string;
    roles: IPlayerRoles;
};

export interface IPlayerRoles {
    tank?: IProdRankData;
    damage?: IProdRankData;
    support?: IProdRankData;
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
    teamInfo: ITeamInfo;
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
    player2Index: number | null;
};

export interface ITeamCounts {
    damage: number;
    tank: number;
    support: number;
};
