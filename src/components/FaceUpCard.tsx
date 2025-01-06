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
        class={`flex h-28 w-20 flex-col items-center justify-between rounded border border-black bg-white p-2 text-black dark:border-white dark:bg-black dark:text-white ${props.class ?? ''}`}
        style={props.style}
        on:click={props.onClick}
    >
        <div class='text-xl font-bold'>{props.value.rank}</div>
        <div
            class={`text-xl ${isRedSuit(props.value.suit) ? 'text-red-500' : 'text-black dark:text-gray-600'}`}
        >
            {suitSymbols[props.value.suit]}
        </div>
        <div class='rotate-180 text-xl font-bold'>{props.value.rank}</div>
    </button>
);

export default FaceUpCard;
