import { createMutable } from 'solid-js/store';

import Deck from '~/components/Deck';
import { GameState } from '~/components/GameStateProvider';
import MovingCards from '~/components/MovingCards';
import OpponentHand from '~/components/OpponentHand';
import PlayerHand from '~/components/PlayerHand';
import { DEFAULT_DECK, isSameCard, PlayingDeck } from '~/game-logic/card';
import { shuffle } from '~/util/array';
import { assertNotUndef } from '~/util/not-undef';
import createSSRSafe from '~/util/ssr-safe';

export type GameProps = {
    playerName: string;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unnecessary-type-parameters
const UNINIT_HTML_ELEMENT = <T extends HTMLElement>(): T => (void 0)!;

const Game = (props: GameProps) => {
    const startingDeck = createSSRSafe(generateStartingCards);
    let deckRef!: HTMLLIElement;
    const state = createMutable<GameState>(
        {
            deck: startingDeck,
            movingCards: [],
            opponentHand: [],
            playerHand: { cards: [], numHovered: 0 },
        },
        { name: 'Game State' },
    );
    return (
        <div class='grid h-screen auto-rows-fr grid-cols-1 gap-4'>
            <OpponentHand
                playerName='Opponent'
                cardStates={state.opponentHand}
            />
            <Deck
                ref={deckRef}
                cards={state.deck}
                onCardDrawn={(card) => {
                    state.playerHand.cards.push({
                        isHovered: false,
                        isVisible: false,
                        ref: { inner: UNINIT_HTML_ELEMENT() },
                        value: card,
                    });
                    state.movingCards.push(card);
                }}
            />
            <PlayerHand
                cardStates={state.playerHand.cards}
                numHovered={state.playerHand.numHovered}
                playerName={props.playerName}
                setNumHovered={(num) => (state.playerHand.numHovered = num)}
            />
            <MovingCards
                deckPosition={deckRef.getBoundingClientRect()}
                cards={state.movingCards}
                playerHand={state.playerHand.cards}
                onFinishedMoving={(index) => {
                    const s = state.movingCards.splice(index(), 1)[0];
                    const playerHandState = assertNotUndef(
                        state.playerHand.cards.find((c) =>
                            isSameCard(c.value, s),
                        ),
                    );
                    playerHandState.isVisible = true;
                }}
                numHovered={state.playerHand.numHovered}
            />
        </div>
    );
};

export default Game;
