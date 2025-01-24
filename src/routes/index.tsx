import Game from '~/components/Game';
import Header from '~/components/Header';

const Home = () => (
    <>
        <Header />
        <main>
            <Game playerName='John' />
        </main>
    </>
);

export default Home;
