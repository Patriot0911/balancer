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
            {
                teamPlayers.map((team) => (
                    <Team
                        name={`Team ${team.tank[0].name}`}
                        teamInfo={team}
                        key={`Team ${team.tank[0].name}`}
                    />
                ))
            }
            {/* <Team
                name={'Team A'}
                teamInfo={teamPlayers[0]}
                key={'Team A'}
            />
            <h3>VS</h3>
            <Team
                name={'Team B'}
                teamInfo={teamPlayers[1]}
                key={'Team B'}
            /> */}
        </div>
    );
};

export default TeamsBlock;