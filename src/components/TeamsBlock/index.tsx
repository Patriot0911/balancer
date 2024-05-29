"use client";
import './TeamsBlock.css';
import Team from '../Team';
import { useAppSelector } from '@/redux/store';
import { ITeamPairInfo } from '@/types';

const TeamsBlock = () => {
    const teams = useAppSelector(item => item.teamsReducer.value);
    const teamPairs: ITeamPairInfo[] = [];

    for (let i = 0; i < teams.length; i += 2) {
        if (i + 1 < teams.length) {
            teamPairs.push({
                teamA: teams[i],
                teamB: teams[i + 1],
            });
        }
    }
    return (
        <div
            className={'teams-block'}
        >
            {
                teamPairs.map((team) => (
                    <>
                        <Team
                            name={`Team ${team.teamA.tank[0].name}`}
                            teamInfo={team.teamA}
                            key={`Team ${team.teamB.tank[0].name}`}
                        />
                        <h3>VS</h3>
                        <Team
                            name={`Team ${team.teamB.tank[0].name}`}
                            teamInfo={team.teamB}
                            key={`Team ${team.teamB.tank[0].name}`}
                        />
                    </>
                ))
            }
        </div>
    );
};

export default TeamsBlock;