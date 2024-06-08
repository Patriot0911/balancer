import './Team.css';
import EmptyTeam from './EmptyTeam';
import { ITeamProps } from '@/types';
import TeamPlayerList from './TeamPlayerList';

const Team = ({ teamInfo, name }: ITeamProps) => {
  return (
    <div
      className={'team-info'}
    >
      {
        name && <h1>{name} [{teamInfo ? teamInfo.score : 0}]</h1>
      }
      <div
        className={'team-players'}
      >
        {
          teamInfo ?
            <TeamPlayerList
              teamInfo={teamInfo}
            /> :
            <EmptyTeam />
        }
      </div>
    </div>
  );
};

export default Team;
