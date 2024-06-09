"use client";

import './BalanceActions.css';
import { addTeam, clearAllTeams } from '@/redux/features/teams-slice';
import { ErrorInfo, ClassicButton } from "@/components/ui";
import { IBalanceActionsProps } from '@/types';
import balancer from '@/scripts/newBalancer';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const BalanceActions = ({ players }: IBalanceActionsProps) => {
    const [error, setError] = useState<string | null>();
    const dispatch = useDispatch();

    const balanceHandle = (isMixed: boolean) => {
        const teamsNumber = 2 /*Math.floor(players.length / 5)*/;
        if (teamsNumber < 2) {
            return setError("Not enough players to form teams");
        };
        try {
            const teams = balancer(players, isMixed, teamsNumber);
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
                    <ErrorInfo
                        text={error}
                    />
                }
            </div>
            <div>
                <div
                    className={'my-classic-button-container'}
                >
                    <ClassicButton
                        text={'Balance'}
                        onClick={
                            () => balanceHandle(false)
                        }
                    />
                    <ClassicButton
                        text={'Mix Balance'}
                        onClick={
                            () => balanceHandle(true)
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default BalanceActions;
