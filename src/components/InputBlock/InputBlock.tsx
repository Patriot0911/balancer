import AllPlayers from '../AllPlayers/AllPlayers';
import InputPlayer from '../InputPlayer/InputPlayer';
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
