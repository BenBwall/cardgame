import { onMount } from 'solid-js';

import FaceDownCard from '~/components/FaceDownCard';
import FaceUpCard from '~/components/FaceUpCard';
import { PlayingCard } from '~/game-logic/card';
import { Position2d } from '~/util/position';

type DoubleFacedCardProps = {
    card: PlayingCard;
};

// eslint-disable-next-line arrow-body-style
const DoubleFacedCard = (props: DoubleFacedCardProps) => {
    return (
        <li class='inline text-black dark:text-white'>
            <div class='relative h-28 w-20 rotate-x-180 cursor-pointer transition duration-1000 ease-linear transform-3d'>
                <FaceUpCard value={props.card} isVisible={true} />
                <FaceDownCard isVisible={true} />
            </div>
        </li>
    );
};

export type MovingCardProps = {
    startPosition: Position2d;
    targetPosition: Position2d;
    card: PlayingCard;
    onFinishedMoving: () => void;
};

const MovingCard = (props: MovingCardProps) => {
    let ref!: HTMLDivElement;
    const xOffset = () => props.startPosition.x - props.targetPosition.x;
    const yOffset = () => props.startPosition.y - props.targetPosition.y;
    const rotationOffset = () => props.targetPosition.rotation ?? 0;
    onMount(() => {
        const ANIMATION_DURATION = 1000;
        const player = ref.animate(
            [
                {
                    transform: `translate(${xOffset().toString()}px, ${yOffset().toString()}px) rotate(0deg)`,
                },
                {
                    transform: `translate(0px, 0px) rotate(${rotationOffset().toString()}deg)`,
                },
            ],
            {
                duration: ANIMATION_DURATION,
                easing: 'linear',
            },
        );
        player.addEventListener('finish', () => {
            props.onFinishedMoving();
        });
    });
    return (
        <div
            ref={ref}
            class='fixed'
            style={{
                left: `${props.targetPosition.x.toString()}px`,
                top: `${props.targetPosition.y.toString()}px`,
            }}
            on:transitionend={() => {
                props.onFinishedMoving();
            }}
        >
            <DoubleFacedCard card={props.card} />
        </div>
    );
};

export default MovingCard;
