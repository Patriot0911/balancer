import './page.css';
import ErrorMessages from '@/components/ErrorMessages';
import TeamsBlock from '@/components/TeamsBlock';
import InputBlock from '@/components/InputBlock';


const Home = () => {
    return (
        <main>
            <InputBlock />
            <TeamsBlock />
            <ErrorMessages />
        </main>
    );
};

export default Home;