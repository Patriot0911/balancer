"use client";
import './AllPlayers.css';
import { useAppSelector } from '@/redux/store';
import Player from '../Player/Player';
import ClassicButton from '../ui/ClassicButton/ClassicButton';
import { useDispatch } from 'react-redux';
import { addTeam, clearAllTeams } from '@/redux/features/teams-slice';
import { ITeam } from '@/types';

const AllPlayers = () => {
    const players = useAppSelector(state => state.allPlayersReducer.value);
    const dispatch = useDispatch();

    const balanceHandle = () => {
        if(players.length < 10)
            return;
        dispatch(clearAllTeams());
        const teams: ITeam[] = [];
        // dispatch(addTeam(teamA));
    };

    return (
        <section
            className={'all-pls'}
        >
            <h2>All Players</h2>
            <span>Number of players: <b>{players.length}</b></span>
            <div
                className={'players-list'}
            >
                {
                    players.map(
                        (player, index) =>
                        <Player
                            key={index}
                            {...player}
                        />
                    )
                }
            </div>
            <ClassicButton
                onClick={balanceHandle}
                text={'Balance'}
            />
            <ClassicButton
                text={'Save'}
            />
        </section>
    );
};

export default AllPlayers;
