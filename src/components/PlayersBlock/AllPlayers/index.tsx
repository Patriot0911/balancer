"use client";

import './AllPlayers.css';
import PlayersList from './PlayersList';
import { useAppSelector } from '@/redux/store';
import StorageButtons from '@/components/StorageButtons';
import BalanceActions from '../BalanceActions';
import { SettingsButton } from '@/components/Settings';

const AllPlayers = () => {
    const players = useAppSelector(state => state.allPlayersReducer.value);
    return (
        <section
            className={'all-pls'}
        >
            <h2>All Players</h2>
            <span>Number of players: <b>{players.length}</b></span>
            <SettingsButton />
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
