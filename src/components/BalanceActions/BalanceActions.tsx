"use client";

import './BalanceActions.css';
import { IBalanceActionsProps, ITeamInfo } from '@/types';
import { addTeam, clearAllTeams } from '@/redux/features/teams-slice';
import ClassicButton from '../ui/ClassicButton/ClassicButton';
import balanceByPair from '@/scripts/balanceByPair';
import { useDispatch } from 'react-redux';

const BalanceActions = ({ players }: IBalanceActionsProps) => {
    const dispatch = useDispatch();

    const balanceHandle = () => {
        const teams: ITeamInfo[] | undefined = balanceByPair(players);
        console.log(teams);
        if(!teams)
            return console.log('Something went wrong with team generations');
        dispatch(clearAllTeams());
        for(const team of teams) {
            dispatch(addTeam(team));
        };
    };

    return <ClassicButton
        onClick={balanceHandle}
        text={'Balance'}
    />;
};

export default BalanceActions;
