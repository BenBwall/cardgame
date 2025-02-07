import { Show } from 'solid-js';

import FaceDownCard from '~/components/FaceDownCard';
import useGameState from '~/components/GameStateProvider';
import { PlayingCard } from '~/game-logic/card';

export type DeckProps = {
    ref: HTMLElement;
    onCardDrawn: (card: PlayingCard) => void;
    class?: string | undefined;
};

const EmptyDeck = () => (
    <div class='flex justify-center rounded border border-black bg-gray-200 p-2'>
        <p class='h-28 w-20 text-gray-500'>Empty Deck</p>
    </div>
);

const Deck = (props: DeckProps) => {
    const state = useGameState();
    return (
        <div
            class={`content-center rounded bg-green-500 text-center dark:bg-green-700 ${props.class ?? ''}`}
        >
            <div class='place-items-end bg-green-700 dark:bg-green-500'>
                <Show when={state.deckHasCards()} fallback={<EmptyDeck />}>
                    <FaceDownCard
                        ref={props.ref}
                        isVisible={true}
                        onClick={() => {
                            const card = state.drawCard();
                            if (card !== undefined) {
                                props.onCardDrawn(card);
                            }
                        }}
                    />
                </Show>
            </div>
        </div>
    );
};

export default Deck;
