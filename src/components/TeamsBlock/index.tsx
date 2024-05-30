"use client";

import './TeamsBlock.css';
import Team from '@/components/Team';
import { ITeamPairInfo } from '@/types';
import { useAppSelector } from '@/redux/store';
import { Fragment, useEffect, useState } from 'react';

const TeamsBlock = () => {
  const teams = useAppSelector(item => item.teamsReducer.value);
  const [teamPairs, setTeamPairs] = useState<ITeamPairInfo[]>([]);

  useEffect(
    () => {
      const newPairs: ITeamPairInfo[] = [];
      for (let i = 0; i < Math.floor(teams.length/2); ++i) {
        const pairIndex = i*2;
        if(!teams[pairIndex] || !teams[pairIndex+1])
          break;
        newPairs.push({
          teamA: teams[pairIndex],
          teamB: teams[pairIndex + 1],
        });
      };
      setTeamPairs(newPairs);
    },
  [teams]);

  return (
    <div
      className={'teams-block'}
    >
      {
        teamPairs.map(({ teamA, teamB }, teamIndex) =>
          <Fragment
            key={`teams-group-${teamIndex}`}
          >
            <Team
              name={'Team A'}
              teamInfo={teamA}
              key={`team-a-group-${teamIndex}`}
            />
            <h3>VS</h3>
            <Team
              name={`Team B`}
              teamInfo={teamB}
              key={`team-b-group-${teamIndex}`}
            />
          </Fragment>
        )
      }
    </div>
  );
};

export default TeamsBlock;
