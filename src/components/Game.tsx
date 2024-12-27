import Deck from './Deck';
import Hand from './Hand';

export interface GameProps {
    playerName: string;
}

const Game = ({ playerName }: GameProps) => (
    <div>
        <Hand playerName='Opponent' opponent />
        <Deck />
        <Hand playerName={playerName} />
    </div>
);

export default Game;
