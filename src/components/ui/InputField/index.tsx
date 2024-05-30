import './InputField.css';
import { Ref, forwardRef } from 'react';
import { TInputFieldProps } from "@/types";

const InputField = ({ label, name, ...props }: TInputFieldProps, ref: Ref<HTMLInputElement>) => {
    return (
        <>
            <label
                className={'custom-input-label'}
            >
                {label}
            </label>
            <input
                {...props}
                className={'custom-input-input'}
                ref={ref}
                name={name}
                alt={name}
            />
        </>
    );
};

export default forwardRef(InputField);
