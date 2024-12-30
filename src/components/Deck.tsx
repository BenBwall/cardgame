import { Show } from 'solid-js';
import Card, { PlayingCard } from './Card';
import { assertNotUndef } from '~/util/not-undef';

export interface DeckProps {
    cards: PlayingCard[];
    onCardDrawn: (card: PlayingCard) => void;
}

const EmptyDeck = () => {
    return (
        <div class='border border-black p-2 rounded flex justify-center bg-gray-200'>
            <p class='text-gray-500 w-20 h-28'>Empty Deck</p>
        </div>
    );
};

const Deck = (props: DeckProps) => {
    return (
        <div class='bg-green-500 dark:bg-green-700 rounded text-center'>
            <button
                class='bg-green-700 dark:bg-green-500'
                onClick={() => {
                    const card = props.cards.pop();
                    if (card !== undefined) {
                        console.log('Drawing card:', card);
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
