import './ClassicButton.css';
import { TClassicButton } from '@/types';

const ClassicButton = ({ text, ...props }: TClassicButton) => {
    return (
        <button
            {...props}
            className={'my-classic-button'}
        >
            {text}
        </button>
    );
};

export default ClassicButton;