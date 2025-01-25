import { createEffect, onCleanup, onMount } from 'solid-js';

import FaceDownCard from '~/components/FaceDownCard';
import FaceUpCard from '~/components/FaceUpCard';
import { PlayingCard } from '~/game-logic/card';
import { Position2d } from '~/util/position';

type DoubleFacedCardProps = {
    card: PlayingCard;
};

const DoubleFacedCard = (props: DoubleFacedCardProps) => {
    let rootRef!: HTMLElement;
    const DURATION = 1000;
    onMount(() => {
        rootRef.animate(
            [
                {
                    transform: 'rotateX(0deg)',
                },
                {
                    transform: 'rotateX(180deg)',
                },
            ],
            {
                duration: DURATION,
                easing: 'linear',
            },
        );
    });
    return (
        <div
            ref={rootRef as HTMLDivElement}
            class='h-28 w-20 rotate-x-180 cursor-pointer transition duration-1000 ease-linear transform-3d'
        >
            <FaceUpCard
                value={props.card}
                isVisible={true}
                class={'absolute top-0 left-0 z-2 rotate-x-180 backface-hidden'}
            />
            <FaceDownCard
                isVisible={true}
                class='absolute top-0 left-0 backface-hidden'
            />
        </div>
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
    const xDiff = props.startPosition.x - props.targetPosition.x;
    const yDiff = props.startPosition.y - props.targetPosition.y;
    let currentTransform = `translate(${xDiff.toString()}px, ${yDiff.toString()}px) rotate(0deg)`;
    const BASE_DURATION = 1000;
    let duration = BASE_DURATION;
    createEffect(() => {
        const rotation = props.targetPosition.rotation ?? 0;
        const player = ref.animate(
            [
                {
                    transform: currentTransform,
                },
                {
                    transform: `translate(0px, 0px) rotate(${rotation.toString()}deg)`,
                },
            ],
            {
                duration,
                easing: 'ease-in-out',
            },
        );
        const listener = () => {
            props.onFinishedMoving();
        };
        player.addEventListener('finish', listener);
        onCleanup(() => {
            player.pause();
            duration =
                BASE_DURATION - Number(player.currentTime ?? BASE_DURATION);
            currentTransform = getComputedStyle(ref).transform;
            player.removeEventListener('finish', listener);
            player.cancel();
        });
    });
    return (
        <li class='contents'>
            <div
                ref={ref}
                class='fixed box-border'
                style={{
                    left: `${props.targetPosition.x.toString()}px`,
                    top: `${props.targetPosition.y.toString()}px`,
                }}
            >
                <DoubleFacedCard card={props.card} />
            </div>
        </li>
    );
};

export default MovingCard;
