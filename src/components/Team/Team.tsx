import './Team.css';
import { ITeamProps } from '@/types';
import TeamPlayer from './TeamPlayer';

const Team = ({ teamInfo, name }: ITeamProps) => {
    const getRoleId = (index: number) => Math.round(index/2);
    return (
        <div
            className={'team-info'}
        >
            <h1>{name}</h1>
            <div
                className={'team-players'}
            >
                {
                    teamInfo ?
                    Object.entries(teamInfo).map(
                        (item, itemIndex) =>
                        Array.isArray(item[1]) &&
                        item[1].map((player, index) =>
                            <TeamPlayer
                                roleId={itemIndex}
                                player={player}
                                key={`${item[0]}-${index}`}
                            />
                        )
                    ) :
                    [...new Array(5)].map(
                        (item, index) =>
                        <TeamPlayer
                            roleId={getRoleId(index)}
                            key={index}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default Team;
