import { addPlayer } from "@/redux/features/all-players-slice";
import { getRank } from "@/scripts/ranks";
import { IPlayer } from "@/types";
import { useState, useRef, FormEvent } from "react";
import { useDispatch } from "react-redux";

import PlayerFormButtons from "./PlayerFormButtons";

import InputField from "../ui/InputField/InputField";
import ErrorAlert from "../ui/ErrorInfo/ErrorInfo";

const InputPlayerForm = () => {
    const [error, setError] = useState<string | null>();
    const dispatch = useDispatch();

    const nickRef   = useRef<HTMLInputElement>(null);
    const tankRef   = useRef<HTMLInputElement>(null);
    const damageRef = useRef<HTMLInputElement>(null);
    const supportRef = useRef<HTMLInputElement>(null);

    const submitHandle = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nickName = nickRef.current?.value;
        const tankRank = getRank(tankRef.current?.value);
        const damageRank = getRank(damageRef.current?.value);
        const supporRank = getRank(supportRef.current?.value);
        if(!nickName)
            return setError('Something went wrong with nickname value');
        if(!tankRank && !damageRank && !supporRank)
            return setError('At least one role must be provided');
        if(error)
            setError(null);
        const player: IPlayer = {
            name: nickName,
            roles: {
                tank: tankRank,
                damage: damageRank,
                support: supporRank
            }
        };
        dispatch(addPlayer(player));
    };

    return (
        <form
            onSubmit={submitHandle}
        >
            <InputField
                required
                label={'Nick Name'}
                name={'nickName'}
                ref={nickRef}
            />
            {
                error ?
                <ErrorAlert
                    text={error}
                /> :
                <br></br>
            }
            <section
                className={'roles-input-container'}
            >
                <InputField
                    label={'Tank'}
                    name={'tankRank'}
                    ref={tankRef}
                />
                <InputField
                    label={'Damage'}
                    name={'damageRank'}
                    ref={damageRef}
                />
                <InputField
                    label={'Support'}
                    name={'supportRank'}
                    ref={supportRef}
                />
            </section>
            <PlayerFormButtons />
        </form>
    );
};

export default InputPlayerForm;