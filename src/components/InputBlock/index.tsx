import AllPlayers from '@/components/PlayersBlock/AllPlayers';
import InputPlayer from './InputPlayer';
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
