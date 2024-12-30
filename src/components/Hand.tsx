import { Accessor, createSignal, For, Setter, Signal } from 'solid-js';
import Card, { PlayingCard } from './Card';

export interface HandProps {
    cards: PlayingCard[];
    playerName: string;
    opponent?: boolean;
}

const calculateAngle = (index: number, numCards: number, totalArc: number) => {
    return (
        (totalArc / numCards) * (index + 1) -
        (totalArc / 2 + totalArc / numCards / 2)
    );
};

const Hand = (props: HandProps) => {
    props.opponent ??= false;
    return (
        <div class={`relative ${props.opponent ? 'rotate-180 ' : ''}`}>
            <For each={props.cards}>
                {(card, index) => (
                    <Card
                        value={card}
                        style={{
                            transform: `rotate(${calculateAngle(index(), props.cards.length, 270)}deg)`,
                        }}
                        class='absolute [transform-origin:bottom_center]'
                    />
                )}
            </For>
        </div>
    );
};

export default Hand;
