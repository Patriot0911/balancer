import './Player.css';
import { IPlayer } from '@/types';
import PlayerRolesContainer from './PlayerRolesContainer';

const Player = (props: IPlayer) => {
    return (
        <div
            className={'player-container'}
        >
            <h2>{props.name}</h2>
            <PlayerRolesContainer
                {...props}
            />
        </div>
    );
};

export default Player;
