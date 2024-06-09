import { removeError } from "@/redux/features/errors-slice";
import { BiError } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";

interface IErrorBoxProps {
    index:      number;
    title?:      string;
    description: string;
};

const ErrorBox = ({ index, title, description, }: IErrorBoxProps) => {
    const dispatch = useDispatch();
    const removeHandle = () => dispatch(
        removeError({
            index,
        })
    );
    return (
        <div
            className={'error-noty-container'}
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
                {title ?? 'Error'}
                <p>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ErrorBox;
