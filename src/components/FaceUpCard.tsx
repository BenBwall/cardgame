import { JSX } from 'solid-js';

import { PlayingCard, Suit } from '~/game-logic/card';

type FaceUpCardProps = {
    value: PlayingCard;
    class?: string | undefined;
    style?: JSX.CSSProperties | string | undefined;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    isVisible: boolean;
    ref?: HTMLElement;
};

const suitSymbols = Object.freeze({
    Clubs: '♣',
    Diamonds: '♦',
    Hearts: '♥',
    Spades: '♠',
});

const isRedSuit = (suit: Suit) => suit === 'Diamonds' || suit === 'Hearts';

const FaceUpCard = (props: FaceUpCardProps) => (
    <li class='contents'>
        <button
            ref={props.ref as HTMLButtonElement}
            id={`face-up-card-${props.value.rank}-${props.value.suit}`}
            on:mouseenter={() => {
                props.onMouseEnter?.();
            }}
            on:mouseleave={() => {
                props.onMouseLeave?.();
            }}
            on:click={() => {
                props.onClick?.();
            }}
            data-is-visible={props.isVisible.toString()}
            class={`box-border flex h-28 w-20 flex-col items-center justify-between border border-black bg-white p-2 text-xl font-bold data-[is-visible=false]:collapse dark:border-white dark:bg-black ${props.class ?? ''}`}
            style={props.style}
        >
            <div class='card-text'>{props.value.rank}</div>
            <div
                class={`${
                    isRedSuit(props.value.suit) ? 'text-red-500' : (
                        'text-black dark:text-gray-600'
                    )
                } card-text`}
            >
                {suitSymbols[props.value.suit]}
            </div>
            <div class='card-text rotate-180'>{props.value.rank}</div>
        </button>
    </li>
);

export default FaceUpCard;
