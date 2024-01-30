'use client';
import { Ref } from 'react';
import './InputPlayer.css';

const InputPlayer = () => {
    return (
        <section
            className={'input-player'}
        >
            <form
                onSubmit={
                    (e) => e.preventDefault()
                }
            >
                <label>NickName</label>
                <input
                    name={'nickname'}
                    alt={'nickname'}
                />
                <InputField
                    label={'Nick Name'}
                    name={'nickName'}
                    ref={null}
                />
                <section
                    className={'roles-input-container'}
                >
                    <label>Tank</label>
                    <input
                        name={'tankRank'}
                        alt={'Tank'}
                    />

                    <label>Damage</label>
                    <input
                        name={'damageRank'}
                        alt={'damage'}
                    />

                    <label>Tank</label>
                    <input
                        name={'supportRank'}
                        alt={'support'}
                    />
                </section>

                <button
                    type={'submit'}
                > Add </button>
                <button
                    type={'reset'}
                > Clear</button>
            </form>
        </section>
    );
};

interface IInputFieldProps {
    label: string;
    name: string;
    ref?: Ref<HTMLInputElement>;
};

const InputField = ({ label, name, ref }: IInputFieldProps) => {
    return (
        <>
            <label>{label}</label>
            <input
                ref={ref}
                name={name}
                alt={name}
            />
        </>
    );
};

export default InputPlayer;
