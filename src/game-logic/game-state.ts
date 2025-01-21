import '~/util/find-index-and-value';
import '~/util/remove-at';

import { createContext, useContext } from 'solid-js';

import { HtmlRef } from '~/components/Game';
import { isSameCard, PlayingCard } from '~/game-logic/card';
import { assertNotUndef } from '~/util/not-undef';

export type OpponentHandCardState = {
    isVisible: boolean;
    index: number;
    ref: HtmlRef<HTMLLIElement>;
};

export type PlayerHandCardState = {
    isVisible: boolean;
    isHovered: boolean;
    value: PlayingCard;
    ref: HtmlRef<HTMLLIElement>;
};

export type PlayerHandState = {
    cards: PlayerHandCardState[];
    numHovered: number;
};

export type GameState = {
    deck: PlayingCard[];
    movingCards: PlayingCard[];
    opponentHand: OpponentHandCardState[];
    playerHand: PlayerHandState;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unnecessary-type-parameters
const UNINIT_HTML_ELEMENT = <T extends HTMLElement>(): T => (void 0)!;

const BASE_CARD_CURVE_IN_DEGREES = 270;
const CURVE_MULTIPLIER = 1.5;

const calculateAngle = (index: number, numCards: number, curve: number) =>
    (curve / numCards) * (index + 1) - (curve / 2 + curve / numCards / 2);

const cardCurve = (numHovered: number) =>
    numHovered > 0 ?
        BASE_CARD_CURVE_IN_DEGREES * CURVE_MULTIPLIER
    :   BASE_CARD_CURVE_IN_DEGREES;

export class GameStateMethods {
    #state: GameState;
    constructor(state: GameState) {
        this.#state = state;
    }
    drawCard() {
        return this.#state.deck.pop();
    }
    playerDrawnCard(card: PlayingCard) {
        this.#state.playerHand.cards.push({
            isHovered: false,
            isVisible: false,
            ref: { inner: UNINIT_HTML_ELEMENT() },
            value: card,
        });
        this.#state.movingCards.push(card);
    }
    deckHasCards() {
        return this.#state.deck.length > 0;
    }
    opponentHand() {
        return this.#state.opponentHand;
    }
    playerHand() {
        return this.#state.playerHand.cards;
    }
    playCard(index: number) {
        this.#state.playerHand.cards.splice(index, 1);
    }
    hoverCard(index: number) {
        this.#state.playerHand.cards[index].isHovered = true;
        this.#state.playerHand.numHovered++;
    }
    unHoverCard(index: number) {
        this.#state.playerHand.cards[index].isHovered = false;
        this.#state.playerHand.numHovered--;
    }
    playerHandSize() {
        return this.#state.playerHand.cards.length;
    }
    numHovered() {
        return this.#state.playerHand.numHovered;
    }
    findCardInPlayerHand(card: PlayingCard) {
        return this.#state.playerHand.cards.findIndexAndValue(
            (c) => c.value === card,
        );
    }
    calculateCurveInPlayerHand(index: number) {
        return calculateAngle(
            index,
            this.#state.playerHand.cards.length,
            cardCurve(this.#state.playerHand.numHovered),
        );
    }
    movingCards() {
        return this.#state.movingCards;
    }
    cardHasFinishedMovingToPlayerHand(index: number) {
        const s = assertNotUndef(this.#state.movingCards.removeAt(index));
        const playerHandState = assertNotUndef(
            this.#state.playerHand.cards.find((c) => isSameCard(c.value, s)),
        );
        playerHandState.isVisible = true;
    }
}

const GameStateContext = createContext<GameStateMethods>(undefined, {
    name: 'Game State Context',
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const useGameState = () => useContext(GameStateContext)!;

export const GameStateContextProvider = GameStateContext.Provider;

export default useGameState;
