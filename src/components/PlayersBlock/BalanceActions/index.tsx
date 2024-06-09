"use client";

import './BalanceActions.css';
import { addTeam, clearAllTeams } from '@/redux/features/teams-slice';
import { addError } from '@/redux/features/errors-slice';
import { ClassicButton } from "@/components/ui";
import { IBalanceActionsProps } from '@/types';
import balancer from '@/scripts/newBalancer';
import { useDispatch } from 'react-redux';

const BalanceActions = ({ players }: IBalanceActionsProps) => {
    const dispatch = useDispatch();
    const addErrorHandle = (description: string) => dispatch(addError({
        title: 'Balance Error',
        description,
    }));

    const balanceHandle = (isMixed: boolean) => {
        const teamsNumber = Math.floor(players.length / 5);
        if (teamsNumber < 2) {
            return addErrorHandle("Not enough players to form teams");
        };
        try {
            const teams = balancer(players, isMixed, 2);
            if(!teams)
                return addErrorHandle('Something went wrong with team formation');
            dispatch(clearAllTeams());
            for (const team of teams) {
                dispatch(addTeam(team));
            };
        } catch(e: any) {
            return addErrorHandle(e.message);
        };
    };

    return (
        <>
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
