import './page.css';
import InputBlock from '@/components/InputBlock/InputBlock';


const Home = () => {
    return (
        <main>
            <InputBlock />
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
        </main>
    );
};

export default Home;