import { IErrorInfoProps } from '@/types';
import './ErrorInfo.css';

const ErrorInfo = ({ text }: IErrorInfoProps) => {
    return (
        <span
            className={'error-info'}
        >
            {text}
        </span>
    );
};

export default ErrorInfo;