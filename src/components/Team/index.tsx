import './Team.css';
import { ITeamProps } from '@/types';
import EmptyTeam from './EmptyTeam';
import TeamPlayerList from './TeamPlayerList';

const Team = ({ teamInfo, name }: ITeamProps) => {
  return (
    <div
      className={'team-info'}
    >
      {
        teamInfo && <h1>{name} [{teamInfo.score}]</h1>
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
