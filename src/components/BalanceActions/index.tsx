"use client";

import { IBalanceActionsProps, IPlayer, ITeamInfo } from '@/types';
import { addTeam, clearAllTeams } from '@/redux/features/teams-slice';
import ClassicButton from '../ui/ClassicButton';
import ErrorAlert from "../ui/ErrorInfo";
import { balanceByPair } from '@/scripts/balanceByPair';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import balanceInit from '../../../new_algo';

const BalanceActions = ({ players }: IBalanceActionsProps) => {
    const [error, setError] = useState<string | null>();
    const dispatch = useDispatch();

    const balanceHandle = () => {
        const teamsNumber = Math.floor(players.length / 5);
        if (teamsNumber < 2) {
            return setError("Not enough players to form teams");
        }
        // const teams = balanceByPair(players, /*Math.floor(players.length / 5)*/ 2);
        const teams = balanceInit(players, 2);
        if (!teams) {
            return setError("Something went wrong with team formation");
        };
        setError('');
        dispatch(clearAllTeams());
        for (const team of teams) {
            dispatch(addTeam(team));
        };
    };

    return (
        <>
            {
                error ?
                    <ErrorAlert
                        text={error}
                    /> :
                    <br />
            }
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
