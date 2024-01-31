"use client";
import './AllPlayers.css';
import { useAppSelector } from '@/redux/store';
import Player from '../Player/Player';
import ClassicButton from '../ui/ClassicButton/ClassicButton';

const AllPlayers = () => {
    const players = useAppSelector(state => state.allPlayersReducer.value);
    return (
        <section
            className={'all-pls'}
        >
            <h2>All Players</h2>
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
                text={'Balance'}
            />
            <ClassicButton
                text={'Save'}
            />
        </section>
    );
};

export default AllPlayers;
