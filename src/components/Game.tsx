import { createMutable } from 'solid-js/store';
import { createResource } from 'solid-js';
import Deck from './Deck';
import OpponentHand from './OpponentHand';
import PlayerHand from './PlayerHand';
import { PlayingCard } from '~/game-logic/card';
import { shuffle } from '~/util/array';

export type GameProps = {
    playerName: string;
};

type GameState = {
    opponentHand: PlayingCard[];
    playerHand: PlayingCard[];
    deck: PlayingCard[];
    opponentCardDrawnIndices: number[];
};

const generateStartingCards = (): PlayingCard[] => {
    const suits = Object.freeze([
        'Spades',
        'Clubs',
        'Diamonds',
        'Hearts',
    ] as const);
    const values = Object.freeze([
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
    ] as const);
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
            opponentCardDrawnIndices: [],
            opponentHand: [],
            playerHand: [],
        },
        { name: 'Game State' },
    );
    let i = 0;
    return (
        <div class='grid grid-cols-1 grid-rows-3 gap-4 h-screen'>
            <OpponentHand
                playerName='Opponent'
                cardDrawnIndices={state.opponentCardDrawnIndices}
            />
            <Deck
                cards={state.deck}
                onCardDrawn={(card) =>
                    i++ % 2 === 0 ?
                        state.playerHand.push(card)
                    :   (state.opponentCardDrawnIndices.push(i / 2),
                        state.opponentHand.push(card))
                }
            />
            <PlayerHand
                cards={state.playerHand}
                playerName={props.playerName}
            />
        </div>
    );
};

export default Game;
