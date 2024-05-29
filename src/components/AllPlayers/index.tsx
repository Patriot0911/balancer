"use client";

import './AllPlayers.css';
import { useAppSelector } from '@/redux/store';
import StorageButtons from '../StorageButtons';
import PlayersList from './PlayersList';
import BalanceActions from '../BalanceActions';

const AllPlayers = () => {
    const players = useAppSelector(state => state.allPlayersReducer.value);
    return (
        <section
            className={'all-pls'}
        >
            <h2>All Players</h2>
            <span>Number of players: <b>{players.length}</b></span>
            <PlayersList
                players={players}
            />
            <BalanceActions
                players={players}
            />
            <StorageButtons />
        </section>
    );
};

export default AllPlayers;
