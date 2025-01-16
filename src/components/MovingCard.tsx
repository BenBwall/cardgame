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
    targetPosition: Position2d;
    card: PlayingCard;
    onFinishedMoving: () => void;
};

const MovingCard = (props: MovingCardProps) => {
    let ref!: HTMLDivElement;
    const xOffset = () =>
        props.targetPosition.x - ref.getBoundingClientRect().x;
    const yOffset = () =>
        props.targetPosition.y - ref.getBoundingClientRect().y;
    const rotationOffset = () => props.targetPosition.rotation ?? 0;
    return (
        <div ref={ref} class='relative'>
            <div
                class='absolute transition duration-1000 ease-linear'
                style={{
                    transform: `translate(${xOffset().toString()}px, ${yOffset().toString()}px); rotate(${rotationOffset().toString()}deg);`,
                }}
                on:transitionend={() => {
                    props.onFinishedMoving();
                }}
            >
                <DoubleFacedCard card={props.card} />
            </div>
        </div>
    );
};

export default MovingCard;
