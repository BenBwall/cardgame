import { createMutable } from 'solid-js/store';

import Deck from '~/components/Deck';
import MovingCards from '~/components/MovingCards';
import OpponentHand from '~/components/OpponentHand';
import PlayerHand from '~/components/PlayerHand';
import {
    DEFAULT_DECK,
    isSameCard,
    PlayingCard,
    PlayingDeck,
} from '~/game-logic/card';
import { shuffle } from '~/util/array';
import { assertNotUndef } from '~/util/not-undef';
import createSSRSafe from '~/util/ssr-safe';

export type HtmlRef<T extends HTMLElement> = { inner: T };

export type GameProps = {
    playerName: string;
};

export type MovingCardState = {
    value: PlayingCard;
    targetElement: HtmlRef<HTMLLIElement>;
    setIsVisible: () => void;
};

export type OpponentHandCardState = {
    isVisible: boolean;
    index: number;
    ref: HtmlRef<HTMLLIElement>;
};

export type PlayerHandCardState = {
    isVisible: boolean;
    value: PlayingCard;
    ref: HtmlRef<HTMLLIElement>;
};

type GameState = {
    deck: PlayingCard[];
    movingCards: MovingCardState[];
    opponentHand: OpponentHandCardState[];
    playerHand: PlayerHandCardState[];
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unnecessary-type-parameters
const UNINIT_HTML_ELEMENT = <T extends HTMLElement>(): T => (void 0)!;

const generateStartingCards = () => shuffle([...DEFAULT_DECK] as PlayingDeck);

const Game = (props: GameProps) => {
    const startingDeck = createSSRSafe(generateStartingCards);
    const state = createMutable<GameState>(
        {
            deck: startingDeck,
            movingCards: [],
            opponentHand: [],
            playerHand: [],
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
                cards={state.deck}
                onCardDrawn={(card) => {
                    console.log(state);
                    state.playerHand.push({
                        isVisible: false,
                        ref: { inner: UNINIT_HTML_ELEMENT() },
                        value: card,
                    });
                    state.movingCards.push({
                        setIsVisible: () => {
                            const playerHandState = assertNotUndef(
                                state.playerHand.find((c) =>
                                    isSameCard(c.value, card),
                                ),
                            );
                            playerHandState.isVisible = true;
                        },
                        targetElement:
                            state.playerHand[state.playerHand.length - 1].ref,
                        value: card,
                    });
                }}
            />
            <PlayerHand
                cardStates={state.playerHand}
                playerName={props.playerName}
            />
            <MovingCards
                cards={state.movingCards}
                onFinishedMoving={(index) => {
                    console.log('Finished moving card:', index());
                    const s = state.movingCards.splice(index(), 1)[0];
                    s.setIsVisible();
                }}
            />
        </div>
    );
};

export default Game;
