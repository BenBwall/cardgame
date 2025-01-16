import { Accessor, For } from 'solid-js';

import { MovingCardState } from '~/components/Game';
import MovingCard from '~/components/MovingCard';

export type MovingCardsProps = {
    cards: MovingCardState[];
    onFinishedMoving?: (index: Accessor<number>) => void;
};

const MovingCards = (props: MovingCardsProps) => (
    <div class='fixed right-0 bottom-0'>
        <For each={props.cards}>
            {(card, index) => (
                <MovingCard
                    card={card.value}
                    targetPosition={card.targetElement.inner.getBoundingClientRect()}
                    onFinishedMoving={() => props.onFinishedMoving?.(index)}
                />
            )}
        </For>
    </div>
);

export default MovingCards;
