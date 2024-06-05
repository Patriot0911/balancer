import { addPlayer } from "@/redux/features/all-players-slice";
import { getRank } from "@/scripts/ranks";
import { IPlayer } from "@/types";
import { useState, useRef, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";

import PlayerFormButtons from "./PlayerFormButtons";
import InputField from "../ui/InputField";
import ErrorAlert from "../ui/ErrorInfo";

const InputPlayerForm = () => {
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const players = useAppSelector(state => state.allPlayersReducer.value);

    const nickRef = useRef<HTMLInputElement>(null);
    const tankRef = useRef<HTMLInputElement>(null);
    const damageRef = useRef<HTMLInputElement>(null);
    const supportRef = useRef<HTMLInputElement>(null);

    const isValidNickName = (nick: string): boolean => {
        return !players.some(player => player.name === nick);
    };

    const isPositiveNumber = (value: any): boolean => {
        return !isNaN(value) && Number(value) > 0;
    };

    const submitHandle = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nickName = nickRef.current?.value;
        const tankRank = getRank(tankRef.current?.value);
        const damageRank = getRank(damageRef.current?.value);
        const supportRank = getRank(supportRef.current?.value);

        if (!nickName || nickName.trim().length === 0) {
            return setError('Nickname cannot be empty');
        }

        const trimmedNickName = nickName.trim();
        if (!isValidNickName(trimmedNickName)) {
            return setError('Such nickname is already used');
        }

        if (!tankRank && !damageRank && !supportRank) {
            return setError('Roles list cannot be empty');
        }

        if ((tankRank && !isPositiveNumber(tankRank.rankValue)) ||
            (damageRank && !isPositiveNumber(damageRank.rankValue)) ||
            (supportRank && !isPositiveNumber(supportRank.rankValue))) {
            return setError('Ranks must be positive numbers');
        }

        if (error) {
            setError(null);
        }

        const player: IPlayer = {
            name: trimmedNickName,
            roles: {
                tank: tankRank,
                damage: damageRank,
                support: supportRank,
            },
        };

        dispatch(addPlayer(player));
        setTimeout(() => {
            const scrollDiv = document.getElementsByClassName('scrool-div')[0];
            if (scrollDiv) {
                scrollDiv.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    };

    return (
        <form onSubmit={submitHandle}>
            <InputField
                required
                label={'Nick Name'}
                name={'nickName'}
                ref={nickRef}
            />
            {error ? <ErrorAlert text={error} /> : <br />}
            <section className={'roles-input-container'}>
                <InputField label={'Tank'} name={'tankRank'} ref={tankRef} />
                <InputField label={'Damage'} name={'damageRank'} ref={damageRef} />
                <InputField label={'Support'} name={'supportRank'} ref={supportRef} />
            </section>
            <PlayerFormButtons />
        </form>
    );
};

export default InputPlayerForm;