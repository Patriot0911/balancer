import { InputHTMLAttributes, Ref } from "react";

export interface IPlayer {
    name: string;
    roles: {
        tank: number;
        damage: number;
        support: number;
    };
};

export interface IAllPlayersProps {
    playersList: IPlayer[];
};

export interface IInputFieldProps {
    inputSettings?: IInputSettings;
    label: string;
    name: string;
    ref?: Ref<HTMLInputElement>;
};

interface IInputSettings {
    min?: number;
    max?: number;
    required?: boolean;
};

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