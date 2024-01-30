"use client";
import { useAppSelector } from '@/redux/store';
import './AllPlayers.css';

const AllPlayers = () => {
    const players = useAppSelector(state => state.allPlayersReducer.value);
    console.log(players);
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
                            <div
                                key={index}
                            >
                                {player.name}
                            </div>
                    )
                }
            </div>
            <button>Balance</button>
            <button>Save to cookie</button>
        </section>
    );
};

export default AllPlayers;
