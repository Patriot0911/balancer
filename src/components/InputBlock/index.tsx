import AllPlayers from '../AllPlayers';
import InputPlayer from '../InputPlayer';
import './InputBlock.css';

const InputBlock = () => {
    return (
        <div
            className={'input-block'}
        >
            <InputPlayer />
            <AllPlayers />
        </div>
    );
};

export default InputBlock;
