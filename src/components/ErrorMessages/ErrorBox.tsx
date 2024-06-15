import { removeError } from "@/redux/features/errors-slice";
import { BiError } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { motion } from 'framer-motion';

interface IErrorBoxProps {
    index:      number;
    count:      number;
    title?:      string;
    description: string;
};

const motionProps = {
    initial: {
        x: 300,
        opacity: 0,
        scale: 1.1,
    },
    animate: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: {
        x: -300,
        opacity: 0,
        scale: 0.8,
    },
};

const ErrorBox = ({ index, title, description, count, }: IErrorBoxProps) => {
    const dispatch = useDispatch();
    const removeHandle = () => dispatch(
        removeError({
            index,
        })
    );
    return (
        <motion.div
            layout
            className={'error-noty-container'}
            transition={{
                type: 'tween',
            }}
            {...motionProps}
        >
            <BiError
                className={'error-icon'}
            />
            <IoClose
                className={'error-close-icon'}
                onClick={removeHandle}
            />
            <div
                className={'error-info-container'}
            >
                <h4>{title ?? 'Error'} <i>[X  {count}]</i></h4>
                <p>
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

export default ErrorBox;
