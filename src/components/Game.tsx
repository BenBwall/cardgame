import { createMutable } from 'solid-js/store';
import { createResource } from 'solid-js';
import Deck from './Deck';
import Hand from './Hand';
import { PlayingCard } from './Card';
import { shuffle } from '~/util/array';

export interface GameProps {
    playerName: string;
}

interface GameState {
    opponentHand: PlayingCard[];
    playerHand: PlayingCard[];
    deck: PlayingCard[];
}

const generateStartingCards = (): PlayingCard[] => {
    const suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'] as const;
    const values = [
        'A',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'J',
        'Q',
        'K',
    ] as const;
    const cards: PlayingCard[] = [];
    suits.forEach((suit) => {
        values.forEach((rank) => {
            cards.push({ rank, suit });
        });
    });
    shuffle(cards);
    return cards;
};

const Game = (props: GameProps) => {
    const [startingDeck] = createResource(generateStartingCards, {
        initialValue: [],
    });
    const state = createMutable<GameState>(
        {
            deck: startingDeck(),
            opponentHand: [],
            playerHand: [],
        },
        { name: 'Game State' },
    );
    let i = 0;
    return (
        <div class='grid grid-cols-1 grid-rows-3 gap-4 h-screen'>
            <Hand cards={state.opponentHand} playerName='Opponent' opponent />
            <Deck
                cards={state.deck}
                onCardDrawn={(card) =>
                    i++ % 2 === 0 ?
                        state.playerHand.push(card)
                    :   state.opponentHand.push(card)
                }
            />
            <Hand cards={state.playerHand} playerName={props.playerName} />
        </div>
    );
};

export default Game;
