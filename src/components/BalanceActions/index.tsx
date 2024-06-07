"use client";

import { addTeam, clearAllTeams } from '@/redux/features/teams-slice';
import { balanceByPair } from '@/scripts/balanceByPair';
import ErrorAlert from "@/components/ui/ErrorInfo";
import ClassicButton from '../ui/ClassicButton';
import { IBalanceActionsProps } from '@/types';
import balanceInit from '../../../new_algo';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const BalanceActions = ({ players }: IBalanceActionsProps) => {
    const [error, setError] = useState<string | null>();
    const dispatch = useDispatch();

    const balanceHandle = () => {
        const teamsNumber = 2 /*Math.floor(players.length / 5)*/;
        if (teamsNumber < 2) {
            return setError("Not enough players to form teams");
        };
        try {
            const teams = balanceInit(players, teamsNumber);
            if(!teams)
                return setError('Something went wrong with team formation');
            setError('');
            dispatch(clearAllTeams());
            for (const team of teams) {
                dispatch(addTeam(team));
            };
        } catch(e: any) {
            return setError(e.message);
        };
    };

    return (
        <>
            <div
                className={'balance-error-container'}
            >
                {
                    error &&
                    <ErrorAlert
                        text={error}
                    />
                }
            </div>
            <div>
                <ClassicButton
                    onClick={balanceHandle}
                    text={'Balance by pair'}
                />
            </div>
        </>
    );
};

export default BalanceActions;
