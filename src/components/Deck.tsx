import { Accessor, createSignal, Setter, Show, Signal } from 'solid-js';
import Card, { PlayingCard } from './Card';
import { assertNotUndef } from '~/util/not-undef';
import { shuffle } from '~/util/array';

export interface DeckProps {
    cards: PlayingCard[];
    onCardDrawn?: (card: PlayingCard) => void;
}

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
