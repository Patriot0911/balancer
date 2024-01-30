import './AllPlayers.css';

export interface IPlayer {
    name: string;
    roles: {
        tank: number;
        damage: number;
        support: number;
    };
};

interface IAllPlayersProps {
    playersList: IPlayer[];
};

const AllPlayers = ({ playersList }: IAllPlayersProps) => {
    return (
        <section
            className={'all-pls'}
        >
            <h2>All Players</h2>
            <div
                className={'players-list'}
            >
                {
                    playersList.length < 1 ?
                    <h3> No Players Found </h3> :
                    <>bobobob</>
                }
            </div>
            <button>Balance</button>
            <button>Save to cookie</button>
        </section>
    );
};

export default AllPlayers;
