import { addPlayer } from "@/redux/features/all-players-slice";

import { InputField, ErrorInfo, } from '@/components/ui';
import { useState, useRef, FormEvent } from "react";
import PlayerFormButtons from "./PlayerFormButtons";
import { useAppSelector } from "@/redux/store";
import { getRank } from "@/scripts/ranks";
import { useDispatch } from "react-redux";
import { IPlayer } from "@/types";

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

    const isValidRankInput = (rankData?: string) =>
        (!rankData || isNaN(parseInt(rankData as string))) ||parseInt(rankData) >= 0;

    const getRanks = () => {
        try {
            if(
                !isValidRankInput(tankRef.current?.value) ||
                !isValidRankInput(damageRef.current?.value) ||
                !isValidRankInput(supportRef.current?.value)
            ) {
                setError('Invalid rank provided');
                return {
                    state: false,
                };
            };
            const tankRank = getRank(tankRef.current?.value);
            const damageRank = getRank(damageRef.current?.value);
            const supportRank = getRank(supportRef.current?.value);
            return {
                state: true,
                tankRank,
                damageRank,
                supportRank,
            };
        } catch (e: any) {
            setError(e.message);
        };
        return {
            state: false,
        };
    };

    const submitHandle = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nickName = nickRef.current?.value;
        const ranks = getRanks();
        if(!ranks || !ranks.state)
            return;
        const {
            damageRank,
            supportRank,
            tankRank,
        } = ranks;

        if (!nickName || nickName.trim().length === 0) {
            return setError('Nickname cannot be empty');
        };

        const trimmedNickName = nickName.trim();
        if (!isValidNickName(trimmedNickName)) {
            return setError('Such nickname is already used');
        };

        if (!tankRank && !damageRank && !supportRank) {
            return setError('Roles list cannot be empty');
        };

        if (error)
            setError(null);

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
            <div
                className={'error-container'}
            >
                {
                    error && <ErrorInfo text={error} />
                }
            </div>
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