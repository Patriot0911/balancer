import './Team.css';
import { ITeamProps } from '@/types';
import TeamPlayer from './TeamPlayer';
import EmptyTeam from './EmptyTeam';
import TeamPlayerList from './TeamPlayerList';

const Team = ({ teamInfo, name }: ITeamProps) => {
    return (
        <div
            className={'team-info'}
        >
            <h1>{name} [{teamInfo.score}]</h1>
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
