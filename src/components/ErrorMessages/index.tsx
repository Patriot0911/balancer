'use client';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector } from "@/redux/store";
import ErrorBox from './ErrorBox';
import './ErrorMessages.css';

const ErrorMessages = () => {
    const errors = useAppSelector(
        selector => selector.errorsReducer.errors
    );
    return (
        <div
            className={'error-notifications-container'}
        >
            <AnimatePresence>
                {
                    errors.map(
                        (item, index) => <ErrorBox
                            key={index}
                            index={index}
                            {...item}
                        />
                    )
                }
            </AnimatePresence>
        </div>
    );
};

export default ErrorMessages;
