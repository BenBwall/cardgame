import { Accessor, createSignal, For, Setter, Signal } from 'solid-js';
import Card, { PlayingCard } from './Card';

export interface HandProps {
    cards: PlayingCard[];
    playerName: string;
    opponent?: boolean;
}

const Hand = (props: HandProps) => {
    return (
        <div
            class={`flex gap-2 ${props.opponent ? 'flex-row-reverse' : 'flex-row'} bg-amber-100 dark:bg-gray-900 min-h-5`}
        >
            <For each={props.cards}>{(card) => Card({ value: card })}</For>
        </div>
    );
};

export default Hand;
