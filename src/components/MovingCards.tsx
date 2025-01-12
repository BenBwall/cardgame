import { For } from 'solid-js';
import { PlayingCard } from '~/game-logic/card';

export type MovingCardsProps = {
    cards: PlayingCard[];
};

const MovingCards = (props: MovingCardsProps) => (
    <div class='fixed right-0 bottom-0'>
        <For each={props.cards}>
            {(card) => (
                <div class='rounded border border-black bg-white'>
                    <p>
                        {card.rank} of {card.suit}
                    </p>
                </div>
            )}
        </For>
    </div>
);

export default MovingCards;
