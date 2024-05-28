"use client";

import { IBalanceActionsProps, IPlayer, ITeamInfo } from '@/types';
import { addTeam, clearAllTeams } from '@/redux/features/teams-slice';
import ClassicButton from '../ui/ClassicButton/ClassicButton';
import { balanceByPair } from '@/scripts/balanceByPair';
import { useDispatch } from 'react-redux';

const BalanceActions = ({ players }: IBalanceActionsProps) => {
    const dispatch = useDispatch();

    const isPlayerInTeam = (player: IPlayer, teams: ITeamInfo[]): boolean => {
        for (const team of teams) {
            if (
                !team.tank.includes(player)
                && !team.damage.includes(player)
                && !team.support.includes(player)
            ) {
                return true;
            }
        }

        return false;
    }

    const balanceHandle = () => {
        const teams = balanceByPair(players, Math.floor(players.length / 5));
        console.log(teams);
        if (!teams)
            return console.log('Something went wrong with team generations');
        dispatch(clearAllTeams());
        for (const team of teams) {
            dispatch(addTeam(team));
        };
    };

    return (
        <div>
            <ClassicButton
                onClick={balanceHandle}
                text={'Balance by pair'}
            />
        </div>
    );
};

export default BalanceActions;
