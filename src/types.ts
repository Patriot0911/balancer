import { ButtonHTMLAttributes, InputHTMLAttributes, Ref } from "react";

export interface IPlayer {
    name: string;
    roles: {
        tank?: IProdRankData;
        damage?: IProdRankData;
        support?: IProdRankData;
    };
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
    players: IPlayer[];
    name: string;
};