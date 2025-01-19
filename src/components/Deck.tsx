import { Show } from 'solid-js';

import FaceDownCard from '~/components/FaceDownCard';
import { PlayingCard } from '~/game-logic/card';

export type DeckProps = {
    ref: HTMLLIElement;
    cards: PlayingCard[];
    onCardDrawn: (card: PlayingCard) => void;
};

const EmptyDeck = () => (
    <div class='flex justify-center rounded border border-black bg-gray-200 p-2'>
        <p class='h-28 w-20 text-gray-500'>Empty Deck</p>
    </div>
);

const Deck = (props: DeckProps) => (
    <div class='content-center rounded bg-green-500 text-center dark:bg-green-700'>
        <div class='place-items-end bg-green-700 dark:bg-green-500'>
            <Show when={props.cards.length > 0} fallback={<EmptyDeck />}>
                <FaceDownCard
                    ref={props.ref}
                    isVisible={true}
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
