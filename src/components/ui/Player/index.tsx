import './Player.css';
import { useRef, useState } from 'react';
import ActionLayer from './ActionLayer';
import { IPlayer, Role } from '@/types';
import { useDispatch } from 'react-redux';
import { getRank } from '@/scripts/ranks';
import { useAppSelector } from '@/redux/store';
import PlayerDataDetails from './PlayerDataDetails';
import { removePlayer, replacePlayer } from '@/redux/features/all-players-slice';

const Player = ({ name, roles, }: IPlayer) => {
    const [isInEdit, setIsInEdit] = useState(false);
    const dispatch = useDispatch();

    const players = useAppSelector(state => state.allPlayersReducer.players);

    const nickRef = useRef<HTMLInputElement>(null);
    const tankRef = useRef<HTMLInputElement>(null);
    const damageRef = useRef<HTMLInputElement>(null);
    const supportRef = useRef<HTMLInputElement>(null);

    const isValidNickName = (nick: string): boolean => {
        return nick === name || !players.some(player => player.name === nick);
    };

    const changeEditState = () => setIsInEdit(!isInEdit);

    const saveChanges = () => {
        const nickName = nickRef.current?.value;
        const tankRank = getRank(tankRef.current?.value);
        const damageRank = getRank(damageRef.current?.value);
        const supporRank = getRank(supportRef.current?.value);
        if (!nickName || nickName.trim().length === 0)
            return;
        const trimmedNickName = nickName.trimStart().trimEnd();
        if (!isValidNickName(trimmedNickName))
            return;
        if (!tankRank && !damageRank && !supporRank)
            return;
        const player: IPlayer = {
            name: trimmedNickName,
            roles: {
                tank: tankRank,
                damage: damageRank,
                support: supporRank,
            },
        };
        dispatch(replacePlayer({
            name,
            player,
        }));
        changeEditState();
        setTimeout(() => {
            const scrollDiv = document.getElementsByClassName('scrool-div')[0];
            if (scrollDiv)
                scrollDiv.scrollIntoView({
                    behavior: "smooth"
                });
        });
    };

    const deleteHandle = () => {
        if(isInEdit)
            setIsInEdit(false);
        dispatch(removePlayer({
            name: name,
        }));
    };

    return (
        <div
            className={'player-container'}
        >
            <ActionLayer
                isInEdit={isInEdit}
                editingCallback={changeEditState}
                saveCallback={saveChanges}
                deleteCallback={deleteHandle}
            />
            {
                !isInEdit ?
                <PlayerDataDetails
                    name={name}
                    roles={roles}
                /> :
                <>
                    <input
                        defaultValue={name}
                        className={'player-nickname-input-change'}
                        ref={nickRef}
                    />
                    <section
                        className={'player-roles-container'}
                    >
                        <input
                            className={'player-role-input-change'}
                            defaultValue={roles[Role.Tank]?.rankValue ?? ''}
                            ref={tankRef}
                        />
                        <input
                            className={'player-role-input-change'}
                            defaultValue={roles[Role.Damage]?.rankValue ?? ''}
                            ref={damageRef}
                        />
                        <input
                            className={'player-role-input-change'}
                            defaultValue={roles[Role.Support]?.rankValue ?? ''}
                            ref={supportRef}
                        />
                    </section>
                </>
            }
        </div>
    );
};

export default Player;
