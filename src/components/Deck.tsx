import Card, { PlayingCard } from './Card';
import { createStore, SetStoreFunction } from 'solid-js/store';
import { assertNotUndef } from '~/util/not-undef';
import { Show } from 'solid-js';

export interface DeckProps {
    startingCards?: PlayingCard[];
    onCardDrawn?: (card: PlayingCard) => void;
}

interface PlayingDeck {
    cards: PlayingCard[];
}

const shuffle = <T,>(array: T[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

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

const dealCard = (setDeck: SetStoreFunction<PlayingDeck>) => {
    let ret: PlayingCard | undefined;
    setDeck('cards', (cards) => {
        ret = cards.pop();
        return [...cards];
    });
    console.log(ret);
    return ret;
};

const topCard = (deck: PlayingDeck) => deck.cards[deck.cards.length - 1];

const hasCards = (deck: PlayingDeck) => deck.cards.length > 0;

const Deck = ({
    startingCards = generateStartingCards(),
    onCardDrawn,
}: DeckProps) => {
    const [deck, setDeck] = createStore<PlayingDeck>(
        { cards: [...startingCards] },
        {
            name: `Deck`,
        },
    );
    return (
        <div class='deck bg-green-500 dark:bg-green-700 text-center'>
            <button
                class='card bg-green-700 dark:bg-green-500'
                onClick={() => {
                    const card = dealCard(setDeck);
                    if (card && onCardDrawn) {
                        onCardDrawn(card);
                    }
                }}
            >
                <Show
                    when={hasCards(deck)}
                    fallback={
                        <div class='card bg-green-700 dark:bg-green-500' />
                    }
                >
                    <Card value={assertNotUndef(topCard(deck))} />
                </Show>
            </button>
        </div>
    );
};

export default Deck;
