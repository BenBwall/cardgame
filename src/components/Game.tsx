import { DEFAULT_DECK, PlayingCard, PlayingDeck } from '~/game-logic/card';
import { createMutable } from 'solid-js/store';
import createSSRSafe from '~/util/ssr-safe';
import Deck from '~/components/Deck';
import MovingCards from './MovingCards';
import OpponentHand from '~/components/OpponentHand';
import PlayerHand from '~/components/PlayerHand';
import { shuffle } from '~/util/array';

export type GameProps = {
    playerName: string;
};

type GameState = {
    deck: PlayingCard[];
    movingCards: PlayingCard[];
    opponentCardDrawnIndices: number[];
    playerHand: PlayingCard[];
};

const generateStartingCards = () => shuffle([...DEFAULT_DECK] as PlayingDeck);

const Game = (props: GameProps) => {
    const startingDeck = createSSRSafe(generateStartingCards);
    const state = createMutable<GameState>(
        {
            deck: startingDeck,
            movingCards: [],
            opponentCardDrawnIndices: [],
            playerHand: [],
        },
        { name: 'Game State' },
    );
    let i = 0;
    return (
        <div class='grid h-screen auto-rows-fr grid-cols-1 gap-4'>
            <OpponentHand
                playerName='Opponent'
                cardDrawnIndices={state.opponentCardDrawnIndices}
            />
            <Deck
                cards={state.deck}
                onCardDrawn={(card) =>
                    i++ % 2 === 0 ?
                        state.playerHand.push(card)
                    :   state.opponentCardDrawnIndices.push(i / 2)
                }
            />
            <PlayerHand
                cards={state.playerHand}
                playerName={props.playerName}
            />
            <MovingCards cards={state.movingCards} />
        </div>
    );
};

export default Game;
