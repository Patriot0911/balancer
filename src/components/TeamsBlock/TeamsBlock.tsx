"use client";
import './TeamsBlock.css';
import Team from '../Team/Team';
import { useAppSelector } from '@/redux/store';

const TeamsBlock = () => {
    const teamPlayers = useAppSelector(item => item.teamsReducer.value);
    return (
        <div
            className={'teams-block'}
        >
            <Team
                name={'Team A'}
                players={teamPlayers[0]}
                key={'Team A'}
            />
            <h3>VS</h3>
            <Team
                name={'Team B'}
                players={teamPlayers[1]}
                key={'Team B'}
            />
        </div>
    );
};

export default TeamsBlock;