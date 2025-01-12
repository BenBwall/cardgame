import { createEffect, createSignal, onMount, Show } from 'solid-js';
import { PlayingCard } from '~/game-logic/card';
import { Position2d } from '~/util/position';

export type MovingCardProps = {
    targetPosition: Position2d;
    card: PlayingCard;
};

const MovingCard = (props: MovingCardProps) => (
    <div class='relative'>
        <div
            class='absolute transition duration-500'
            style={{
                transform: `translate(${(props.targetPosition.x - rect.x).toString()}px, ${(props.targetPosition.y - rect.y).toString()}px); rotate(${(props.targetPosition.rotation ?? 0).toString()}deg);`,
            }}
        >
            {movingItem().item}
        </div>
    </div>
);

export default MovingCard;
