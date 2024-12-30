import FaceDownCard from './FaceDownCard';
import { PlayingCard } from '~/game-logic/card';
import { Show } from 'solid-js';

export type DeckProps = {
    cards: PlayingCard[];
    onCardDrawn: (card: PlayingCard) => void;
};

const EmptyDeck = () => (
    <div class='border border-black p-2 rounded flex justify-center bg-gray-200'>
        <p class='text-gray-500 w-20 h-28'>Empty Deck</p>
    </div>
);

const Deck = (props: DeckProps) => (
    <div class='bg-green-500 dark:bg-green-700 rounded text-center content-center'>
        <div class='bg-green-700 dark:bg-green-500'>
            <Show when={props.cards.length > 0} fallback={<EmptyDeck />}>
                <FaceDownCard
                    onClick={() => {
                        const card = props.cards.pop();
                        if (card !== undefined) {
                            props.onCardDrawn(card);
                        }
                    }}
                />
            </Show>
        </div>
    </div>
);

export default Deck;
