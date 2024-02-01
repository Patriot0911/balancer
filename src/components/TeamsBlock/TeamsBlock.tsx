import './TeamsBlock.css';
import Team from '../Team/Team';

const TeamsBlock = () => {
    // const teams = useAppSelector(item => item. smthng like 'teams');
    return (
        <div
            className={'teams-block'}
        >
            <Team
                name={'Team A'}
                players={[]}
                key={'Team A'}
            />
            <h2>VS</h2>
            <Team
                name={'Team B'}
                players={[]}
                key={'Team B'}
            />
        </div>
    );
};

export default TeamsBlock;