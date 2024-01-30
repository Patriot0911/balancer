import './InputField.css';
import { Ref, forwardRef } from 'react';
import { IInputFieldProps } from "@/types";

const InputField = ({ label, name, inputSettings }: IInputFieldProps, ref: Ref<HTMLInputElement>) => {
    return (
        <>
            <label
                className={'custom-input-label'}
            >
                {label}
            </label>
            <input
                min={inputSettings?.min}
                max={inputSettings?.max}
                required={inputSettings?.required}
                className={'custom-input-input'}
                ref={ref}
                name={name}
                alt={name}
            />
        </>
    );
};

export default forwardRef(InputField);