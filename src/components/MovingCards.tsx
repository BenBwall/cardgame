import { Accessor, For } from 'solid-js';

import { MovingCardState } from '~/components/Game';
import MovingCard from '~/components/MovingCard';
import { Position2d } from '~/util/position';

export type MovingCardsProps = {
    cards: MovingCardState[];
    onFinishedMoving?: (index: Accessor<number>) => void;
    deckPosition: Position2d;
};

const MovingCards = (props: MovingCardsProps) => (
    <div>
        <For each={props.cards}>
            {(card, index) => (
                <MovingCard
                    card={card.value}
                    startPosition={props.deckPosition}
                    targetPosition={card.targetElement.inner.getBoundingClientRect()}
                    onFinishedMoving={() => props.onFinishedMoving?.(index)}
                />
            )}
        </For>
    </div>
);

export default MovingCards;
