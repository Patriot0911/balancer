"use client";

import './TeamsBlock.css';
import { ITeamPairInfo } from '@/types';
import { useEffect, useState } from 'react';
import TeamGroupBlock from './TeamGroupBlock';
import { useAppSelector } from '@/redux/store';


const TeamsBlock = () => {
  const teams = useAppSelector(item => item.teamsReducer.value);
  const [teamPairs, setTeamPairs] = useState<ITeamPairInfo[]>([]);

  useEffect(
    () => {
      console.log(teams);
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
    }, [teams]
  );

  return (
    <div
      className={'teams-block'}
    >
      {
        teamPairs.length > 0 ?
        teamPairs.map(({ teamA, teamB }, teamIndex) =>
          <TeamGroupBlock
            teamA={teamA}
            teamB={teamB}
            key={`team-block-${teamIndex}`}
            special={teamIndex.toString()}
          />
        ) :
        <TeamGroupBlock
          special={'empty'}
        />
      }
    </div>
  );
};

export default TeamsBlock;
