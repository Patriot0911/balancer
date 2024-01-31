import { useAppSelector } from '@/redux/store';
import './TeamsBlock.css';

const TeamsBlock = () => {
    // const teams = useAppSelector(item => item. smthng like 'teams');
    return (
        <div
            className={'teams-block'}
        >
            <section>
                Team A
            </section>
            <h2>VS</h2>
            <section>
                Team B
            </section>
        </div>
    );
};

export default TeamsBlock;