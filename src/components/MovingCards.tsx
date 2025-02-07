import '~/util/find-index-and-value';

import { Accessor, For } from 'solid-js';

import useGameState from '~/components/GameStateProvider';
import MovingCard from '~/components/MovingCard';
import { PlayingCard } from '~/game-logic/card';
import { assertNotUndef } from '~/util/not-undef';
import { Position2d } from '~/util/position';

export type MovingCardsProps = {
    onFinishedMoving?: (index: Accessor<number>) => void;
    deckPosition: Position2d;
    class?: string | undefined;
};

const MovingCards = (props: MovingCardsProps) => {
    const state = useGameState();
    const targetPosition = (card: PlayingCard) => {
        const [cardState, index] = assertNotUndef(
            state.findCardInPlayerHand(card),
            'Card not found in player hand',
        );

        const pos = cardState.ref.inner.getBoundingClientRect();

        const rotation = state.calculateCurveInPlayerHand(index);

        return {
            rotation,
            x: pos.left,
            y: pos.top,
        };
    };
    return (
        <ul class={props.class ?? ''}>
            <For each={state.movingCards()}>
                {(card, index) => (
                    <MovingCard
                        card={card}
                        startPosition={props.deckPosition}
                        targetPosition={targetPosition(card)}
                        onFinishedMoving={() => props.onFinishedMoving?.(index)}
                    />
                )}
            </For>
        </ul>
    );
};

export default MovingCards;
