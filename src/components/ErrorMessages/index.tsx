'use client';
import ErrorBox from './ErrorBox';
import './ErrorMessages.css';
import { useAppSelector } from "@/redux/store";

const ErrorMessages = () => {
    const errors = useAppSelector(
        selector => selector.errorsReducer.errors
    );
    return (
        <div
            className={'error-notifications-container'}
        >
            {
                errors.map(
                    (item, index) => <ErrorBox
                        key={index}
                        index={index}
                        {...item}
                    />
                )
            }
        </div>
    );
};

export default ErrorMessages;
