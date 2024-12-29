import { createMutable } from 'solid-js/store';
import Deck from './Deck';
import Hand from './Hand';
import { PlayingCard } from './Card';

export interface GameProps {
    playerName: string;
}

interface GameState {
    opponentHand: PlayingCard[];
    playerHand: PlayingCard[];
    deck: PlayingCard[];
}

const Game = (props: GameProps) => {
    const state = createMutable<GameState>(
        {
            opponentHand: [],
            playerHand: [],
            deck: [],
        },
        { name: 'Game State' },
    );
    return (
        <div>
            <Hand cards={state.opponentHand} playerName='Opponent' opponent />
            <Deck
                cards={state.deck}
                onCardDrawn={(card) => state.playerHand.push(card)}
            />
            <Hand cards={state.playerHand} playerName={props.playerName} />
        </div>
    );
};

export default Game;
