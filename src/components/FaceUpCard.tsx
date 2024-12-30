import { PlayingCard, Suit } from '~/game-logic/card';
import { JSX } from 'solid-js';

export type FaceUpCardProps = {
    value: PlayingCard;
    class?: string | undefined;
    style?: JSX.CSSProperties | string | undefined;
    onClick?: () => void;
};

const suitSymbols = Object.freeze({
    Clubs: '♣',
    Diamonds: '♦',
    Hearts: '♥',
    Spades: '♠',
});

const isRedSuit = (suit: Suit) => suit === 'Diamonds' || suit === 'Hearts';

const FaceUpCard = (props: FaceUpCardProps) => (
    <button
        class={`border border-black dark:border-white p-2 rounded w-20 h-28 flex flex-col justify-between items-center bg-white dark:bg-black text-black dark:text-white ${props.class ?? ''}`}
        style={props.style}
        on:click={props.onClick}
    >
        <div class='text-xl font-bold'>{props.value.rank}</div>
        <div
            class={`text-xl ${isRedSuit(props.value.suit) ? 'text-red-500' : 'text-black dark:text-gray-600'}`}
        >
            {suitSymbols[props.value.suit]}
        </div>
        <div class='text-xl font-bold rotate-180'>{props.value.rank}</div>
    </button>
);

export default FaceUpCard;
