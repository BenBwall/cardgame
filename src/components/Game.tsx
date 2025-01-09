import { DEFAULT_DECK, PlayingCard, PlayingDeck } from '~/game-logic/card';
import { createMutable } from 'solid-js/store';
import createSSRSafe from '~/util/ssr-safe';
import Deck from '~/components/Deck';
import OpponentHand from '~/components/OpponentHand';
import PlayerHand from '~/components/PlayerHand';
import { shuffle } from '~/util/array';
import { TransitionGroup } from 'solid-transition-group';

export type GameProps = {
    playerName: string;
};

type GameState = {
    opponentHand: PlayingCard[];
    playerHand: PlayingCard[];
    deck: PlayingCard[];
    opponentCardDrawnIndices: number[];
};

const generateStartingCards = (): PlayingDeck => shuffle([...DEFAULT_DECK]);

const Game = (props: GameProps) => {
    const startingDeck = createSSRSafe(generateStartingCards);
    const state = createMutable<GameState>(
        {
            deck: startingDeck,
            opponentCardDrawnIndices: [],
            opponentHand: [],
            playerHand: [],
        },
        { name: 'Game State' },
    );
    let i = 0;
    return (
        <div class='grid h-screen auto-rows-fr grid-cols-1 gap-4'>
            <TransitionGroup
                name='draw-card'
                enterActiveClass='transition-opacity duration-500 ease-in-out'
            >
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
            </TransitionGroup>
        </div>
    );
};

export default Game;
