import { Accessor, createSignal, Setter, Show, Signal } from 'solid-js';
import Card, { PlayingCard } from './Card';
import { assertNotUndef } from '~/util/not-undef';
import { shuffle } from '~/util/array';

export interface DeckProps {
    cards: PlayingCard[];
    onCardDrawn?: (card: PlayingCard) => void;
}

class PlayingDeck {
    #getCards: Accessor<PlayingCard[]>;
    #setCards: Setter<PlayingCard[]>;

    constructor(cards: Signal<PlayingCard[]>) {
        [this.#getCards, this.#setCards] = cards;
    }

    #transform<R>(transformer: (cards: PlayingCard[]) => R): R {
        let ret: unknown;
        this.#setCards((cards) => {
            ret = transformer(cards);
            return cards;
        });
        return ret as R;
    }

    #use<R>(user: (cards: PlayingCard[]) => R): R {
        return user(this.#getCards());
    }

    dealCard() {
        return this.#transform((cards) => cards.pop());
    }

    shuffle() {
        this.#transform((cards) => {
            shuffle(cards);
        });
    }

    cards() {
        return this.#getCards();
    }

    length() {
        return this.cards().length;
    }

    topCard(): PlayingCard | undefined {
        return this.#use((cards) => cards[cards.length - 1]);
    }

    hasCards() {
        return this.length() > 0;
    }
}

const generateStartingCards = () => {
    const suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'] as const;
    const values = [
        'Ace',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'Jack',
        'Queen',
        'King',
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

const getStartingCards = (
    startingCards: PlayingCard[] | undefined | null,
): PlayingCard[] => {
    if (startingCards != null) {
        return [...startingCards];
    }
    return generateStartingCards();
};

const EmptyDeck = () => {
    return (
        <div class='empty-deck border border-black p-2 rounded w-20 h-28 flex justify-center items-center bg-gray-200'>
            <div class='text-gray-500'>Empty Deck</div>
        </div>
    );
};

const Deck = (props: DeckProps) => {
    return (
        <div class='bg-green-500 dark:bg-green-700 text-center h-50 w-50 p-10 m-10'>
            <button
                class='bg-green-700 dark:bg-green-500'
                onClick={() => {
                    const card = props.cards.pop();
                    if (card && props.onCardDrawn) {
                        props.onCardDrawn(card);
                    }
                }}
            >
                <Show when={props.cards.length > 0} fallback={<EmptyDeck />}>
                    <Card
                        value={assertNotUndef(
                            props.cards[props.cards.length - 1],
                        )}
                    />
                </Show>
            </button>
        </div>
    );
};

export default Deck;
