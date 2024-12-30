import Card, { PlayingCard } from './Card';
import { For } from 'solid-js';

export interface HandProps {
    cards: PlayingCard[];
    playerName: string;
    opponent?: boolean;
}

const CARD_CURVE_IN_DEGREES = 270;

const calculateAngle = (index: number, numCards: number) =>
    (CARD_CURVE_IN_DEGREES / numCards) * (index + 1) -
    (CARD_CURVE_IN_DEGREES / 2 + CARD_CURVE_IN_DEGREES / numCards / 2);

const Hand = (props: HandProps) => {
    props.opponent ??= false;

    return (
        <div
            class={`relative flex ${props.opponent ? 'rotate-180' : ''} justify-center my-5`}
        >
            <For each={props.cards}>
                {(card, index) => (
                    <Card
                        value={card}
                        style={{
                            transform: `rotate(${calculateAngle(index(), props.cards.length).toString()}deg)`,
                        }}
                        class='absolute [transform-origin:bottom_center] p-0 m-0'
                    />
                )}
            </For>
        </div>
    );
};

export default Hand;
