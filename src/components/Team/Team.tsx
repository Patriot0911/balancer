import './Team.css';
import { ITeamProps } from '@/types';
import TeamPlayer from './TeamPlayer';

const Team = ({ players, name }: ITeamProps) => {
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
                    players ?
                    Object.values(players).map(
                    (item, index) =>
                        Array.isArray(item) ? item.map(
                            player =>
                            <TeamPlayer
                                player={player}
                                roleId={index}
                            />
                        ) :
                        <TeamPlayer
                            player={item}
                            roleId={index}
                        />
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
