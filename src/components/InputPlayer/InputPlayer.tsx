'use client';
import './InputPlayer.css';
import { FormEvent, useRef, useState } from 'react';
import InputField from '../InputField/InputField';
import { getRank } from '@/scripts/ranks';
import { useDispatch } from 'react-redux';

const InputPlayerForm = () => {
    const [error, setError] = useState<string | null>();
    const dispatch = useDispatch();

    const nickRef   = useRef<HTMLInputElement>(null);
    const tankRef   = useRef<HTMLInputElement>(null);
    const damageRef = useRef<HTMLInputElement>(null);
    const supportRef = useRef<HTMLInputElement>(null);

    const submitHandle = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const tankRank = getRank(tankRef.current?.value);
        const damageRef = getRank(tankRef.current?.value);
        const supportRef = getRank(tankRef.current?.value);
        if(!tankRank && !damageRef && !supportRef)
            return setError('At least one role must be provided');
        if(error)
            setError(null);
        // dispatch
    };

    return (
        <form
            onSubmit={submitHandle}
        >
            <InputField
                inputSettings={{
                        required: true
                    }
                }
                label={'Nick Name'}
                name={'nickName'}
                ref={nickRef}
            />
            {
                error && <>{error}</>
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

            <button
                type={'submit'}
            > Add </button>
            <button
                type={'reset'}
            > Clear</button>
        </form>
    );
};

const InputPlayer = () => {
    return (
        <section
            className={'input-player'}
        >
            <InputPlayerForm />
        </section>
    );
};

export default InputPlayer;
