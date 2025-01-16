import { JSX } from 'solid-js';

import { PlayingCard, Suit } from '~/game-logic/card';

type FaceUpCardProps = {
    value: PlayingCard;
    class?: string | undefined;
    style?: JSX.CSSProperties | string | undefined;
    onClick?: () => void;
    isVisible: boolean;
    ref?: HTMLLIElement;
};

const suitSymbols = Object.freeze({
    Clubs: '♣',
    Diamonds: '♦',
    Hearts: '♥',
    Spades: '♠',
});

const isRedSuit = (suit: Suit) => suit === 'Diamonds' || suit === 'Hearts';

const FaceUpCard = (props: FaceUpCardProps) => (
    <li
        data-is-visible={props.isVisible.toString()}
        class={`card-side flex flex-col items-center justify-between bg-white data-[is-visible=false]:collapse dark:border-white dark:bg-black ${props.class ?? ''}`}
        style={props.style}
        ref={props.ref}
    >
        <div class='text-xl font-bold'>{props.value.rank}</div>
        <div
            class={`text-xl ${isRedSuit(props.value.suit) ? 'text-red-500' : 'text-black dark:text-gray-600'}`}
        >
            {suitSymbols[props.value.suit]}
        </div>
        <div class='rotate-180 text-xl font-bold'>{props.value.rank}</div>
    </li>
);

export default FaceUpCard;
