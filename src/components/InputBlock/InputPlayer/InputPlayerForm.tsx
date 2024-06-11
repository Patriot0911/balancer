import { addPlayer } from "@/redux/features/all-players-slice";

import { InputField, } from '@/components/ui';
import PlayerFormButtons from "./PlayerFormButtons";
import { useAppSelector } from "@/redux/store";
import { useRef, FormEvent } from "react";
import { getRank } from "@/scripts/ranks";
import { useDispatch } from "react-redux";
import { IPlayer } from "@/types";
import { addError } from "@/redux/features/errors-slice";

const InputPlayerForm = () => {
    const dispatch = useDispatch();
    const players = useAppSelector(state => state.allPlayersReducer.players);

    const nickRef = useRef<HTMLInputElement>(null);
    const tankRef = useRef<HTMLInputElement>(null);
    const damageRef = useRef<HTMLInputElement>(null);
    const supportRef = useRef<HTMLInputElement>(null);

    const isValidNickName = (nick: string): boolean => {
        return !players.some(player => player.name === nick);
    };

    const isValidRankInput = (rankData?: string) =>
        (!rankData || isNaN(parseInt(rankData as string))) ||parseInt(rankData) >= 0;

    const addErrorHandle = (description: string) => dispatch(addError({
        title: 'Creation Error',
        description,
    }));

    const getRanks = () => {
        try {
            if(
                !isValidRankInput(tankRef.current?.value) ||
                !isValidRankInput(damageRef.current?.value) ||
                !isValidRankInput(supportRef.current?.value)
            ) {
                addErrorHandle('Invalid rank provided');
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
            addErrorHandle(e.message);
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
            return addErrorHandle('Nickname cannot be empty');
        };

        const trimmedNickName = nickName.trim();
        if (!isValidNickName(trimmedNickName)) {
            return addErrorHandle('Such nickname is already used');
        };

        if (!tankRank && !damageRank && !supportRank) {
            return addErrorHandle('Roles list cannot be empty');
        };

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