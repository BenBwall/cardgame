import { PlayingCard, Suit } from '~/game-logic/card';
import { JSX } from 'solid-js';

type BaseCardProps = {
    onClick?: () => void;
    isFaceUp: boolean;
};

type FaceUpCardProps = BaseCardProps & {
    value: PlayingCard;
    class?: string | undefined;
    style?: JSX.CSSProperties | string | undefined;
};

const suitSymbols = Object.freeze({
    Clubs: '♣',
    Diamonds: '♦',
    Hearts: '♥',
    Spades: '♠',
});

const isRedSuit = (suit: Suit) => suit === 'Diamonds' || suit === 'Hearts';

const FaceUpCard = (props: FaceUpCardProps) => (
    <div
        class={`card-side flex flex-col items-center justify-between bg-white dark:border-white dark:bg-black ${props.class ?? ''}`}
        style={props.style}
    >
        <div class='text-xl font-bold'>{props.value.rank}</div>
        <div
            class={`text-xl ${isRedSuit(props.value.suit) ? 'text-red-500' : 'text-black dark:text-gray-600'}`}
        >
            {suitSymbols[props.value.suit]}
        </div>
        <div class='rotate-180 text-xl font-bold'>{props.value.rank}</div>
    </div>
);

type FaceDownCardProps = BaseCardProps & {
    handIndex?: number;
};

const FaceDownCard = (props: FaceDownCardProps) => (
    <div class='card-side rotate-x-180 bg-blue-500 dark:bg-blue-700'>
        {props.handIndex}
    </div>
);

export type CardProps = BaseCardProps & FaceUpCardProps & FaceDownCardProps;

// eslint-disable-next-line arrow-body-style
const Card = (props: CardProps) => {
    return (
        <li class={`inline text-black dark:text-white ${props.class ?? ''}`}>
            <button on:click={props.onClick}>
                <div
                    data-is-face-up={props.isFaceUp.toString()}
                    class='relative h-28 w-20 cursor-pointer transition duration-600 ease-linear transform-3d data-[is-face-up=false]:rotate-x-180'
                >
                    <FaceUpCard {...props} />
                    <FaceDownCard {...props} />
                </div>
            </button>
        </li>
    );
};

export default Card;
