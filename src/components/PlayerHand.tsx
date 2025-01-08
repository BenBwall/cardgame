import Card from '~/components/Card';
import { For } from 'solid-js';
import { PlayingCard } from '~/game-logic/card';

export type PlayerHandProps = {
    cards: PlayingCard[];
    playerName: string;
};

const CARD_CURVE_IN_DEGREES = 270;

const calculateAngle = (index: number, numCards: number) =>
    (CARD_CURVE_IN_DEGREES / numCards) * (index + 1) -
    (CARD_CURVE_IN_DEGREES / 2 + CARD_CURVE_IN_DEGREES / numCards / 2);

const PlayerHand = (props: PlayerHandProps) => (
    <div class={`relative my-5 flex justify-center`}>
        <For each={props.cards}>
            {(card, index) => (
                <Card
                    isFaceUp={true}
                    value={card}
                    handIndex={undefined}
                    style={{
                        transform: `rotate(${calculateAngle(index(), props.cards.length).toString()}deg)`,
                    }}
                    class='absolute origin-bottom'
                    onClick={() => {
                        props.cards.splice(index(), 1);
                    }}
                />
            )}
        </For>
    </div>
);

export default PlayerHand;
