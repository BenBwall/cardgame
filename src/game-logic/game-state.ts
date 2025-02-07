import '~/util/find-index-and-value';
import '~/util/remove-at';

import { createMutable } from 'solid-js/store';

import { HtmlRef } from '~/components/Game';
import {
    CardSortConfig,
    compareCards,
    DEFAULT_DECK,
    isSameCard,
    PlayingCard,
    PlayingDeck,
} from '~/game-logic/card';
import { shuffle } from '~/util/array';
import { assertNotUndef } from '~/util/not-undef';
import createSSRSafe from '~/util/ssr-safe';

type OpponentHandCardState = {
    isVisible: boolean;
    index: number;
    ref: HtmlRef<HTMLElement>;
};

type PlayerHandCardState = {
    isVisible: boolean;
    value: PlayingCard;
    ref: HtmlRef<HTMLElement>;
};

type PlayerHandState = {
    cards: PlayerHandCardState[];
    hoveredCardIndex: number;
    sortConfig: CardSortConfig | undefined;
};

type GameState = {
    deck: PlayingCard[];
    movingCards: PlayingCard[];
    opponentHand: OpponentHandCardState[];
    playerHand: PlayerHandState;
};

const generateStartingCards = () => shuffle([...DEFAULT_DECK] as PlayingDeck);

const createGameState = (): GameState =>
    createMutable(
        {
            deck: createSSRSafe(generateStartingCards),
            movingCards: [],
            opponentHand: [],
            playerHand: {
                cards: [],
                hoveredCardIndex: -1,
                sortConfig: undefined,
            },
        },
        {
            name: 'Game State',
        },
    );

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unnecessary-type-parameters
const UNINIT_HTML_ELEMENT = <T extends HTMLElement>(): T => (void 0)!;

const BASE_CARD_CURVE_IN_DEGREES = 270;
const HOVERED_CARD_CURVE_IN_DEGREES = 450;

const calculateAngle = (index: number, numCards: number, curve: number) =>
    (curve / numCards) * (index + 1) - (curve / 2 + curve / numCards / 2);

const cardCurve = (index: number, hoveredCardIndex: number) =>
    hoveredCardIndex !== -1 && hoveredCardIndex !== index ?
        HOVERED_CARD_CURVE_IN_DEGREES
    :   BASE_CARD_CURVE_IN_DEGREES;

export default class GameStateMethods {
    #state: GameState;
    constructor() {
        this.#state = createGameState();
    }
    drawCard() {
        return this.#state.deck.pop();
    }
    playerDrawnCard(card: PlayingCard) {
        this.#state.playerHand.cards.push({
            isVisible: false,
            ref: { inner: UNINIT_HTML_ELEMENT() },
            value: card,
        });
        const sortConfig = this.#state.playerHand.sortConfig;
        if (sortConfig !== undefined) {
            this.#state.playerHand.cards.sort((a, b) =>
                compareCards(a.value, b.value, sortConfig),
            );
        }
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
        this.#state.playerHand.hoveredCardIndex = index;
    }
    unHoverCard() {
        this.#state.playerHand.hoveredCardIndex = -1;
    }
    playerHandSize() {
        return this.#state.playerHand.cards.length;
    }
    isPlayerHandHovered() {
        return this.#state.playerHand.hoveredCardIndex !== -1;
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
            cardCurve(index, this.#state.playerHand.hoveredCardIndex),
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
