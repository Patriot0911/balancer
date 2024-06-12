import './SwitchButton.css';
import { motion } from 'framer-motion';

interface ISwitchButtonProps {
    state: boolean;
    callback: () => void;
};

const SwitchButton = ({ state, callback }: ISwitchButtonProps) => {
    return (
        <div
            className={`switch-button`}
            data-isOn={state}
            onClick={() => {
                console.log(state ? 'start' : 'end');
                callback()
            }}
        >
            <motion.div
                layout
                transition={{
                    type: 'spring',
                    stiffness: 700,
                    damping: 50
                }}
                className={'circle'}
            />
        </div>
    );
};

export default SwitchButton;
