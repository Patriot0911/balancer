"use client";

import './BalanceActions.css';
import { useDispatch } from 'react-redux';
import balancer from '@/scripts/newBalancer';
import { useAppSelector } from '@/redux/store';
import { IBalanceActionsProps } from '@/types';
import { ClassicButton } from "@/components/ui";
import { addError } from '@/redux/features/errors-slice';
import { addTeam, clearAllTeams } from '@/redux/features/teams-slice';

const BalanceActions = ({ players }: IBalanceActionsProps) => {
    const dispatch = useDispatch();
    const { roles, balanceType } = useAppSelector(
        selector => selector.balanceOptionsReducer
    );
    const addErrorHandle = (description: string) => dispatch(addError({
        title: 'Balance Error',
        description,
    }));

    const balanceHandle = () => {
        const teamsNumber = Math.floor(players.length / 5);
        if (teamsNumber < 2)
            return addErrorHandle("Not enough players to form teams");
        try {
            const teams = balancer(
                players,
                balanceType === 'Mixed',
                2,
                roles
            );
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
        <div
            className={'my-classic-button-container'}
        >
            <ClassicButton
                text={'Balance'}
                onClick={balanceHandle}
            />
        </div>
    );
};

export default BalanceActions;
