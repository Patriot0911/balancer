import './Player.css';
import { IPlayer } from '@/types';
import PlayerRolesContainer from './PlayerRolesContainer';
import ActionLayer from './ActionLayer';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removePlayer } from '@/redux/features/all-players-slice';

const Player = ({ name, roles }: IPlayer) => {
    const [isInEdit, setInEdit] = useState(false);
    const dispatch = useDispatch();

    const changeEditHandle = () => setInEdit(!isInEdit);

    const deleteHandle = () => {
        dispatch(removePlayer({
            name,
        }));
    };

    return (
        <div
            className={'player-container'}
        >
            <h2>{name}</h2>
            <ActionLayer
                editingCallback={changeEditHandle}
                deleteCallback={deleteHandle}
            />
            <PlayerRolesContainer
                isInEdit={isInEdit}
                roles={roles}
            />
        </div>
    );
};

export default Player;
