'use client';
import './ErrorMessages.css';
import ErrorBox from './ErrorBox';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector } from "@/redux/store";

const ErrorMessages = () => {
    const errors = useAppSelector(
        selector => selector.errorsReducer.errors
    );
    return (
        <div
            className={'error-notifications-container'}
        >
            <AnimatePresence
                mode={'popLayout'}
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
            </AnimatePresence>
        </div>
    );
};

export default ErrorMessages;
