import FaceUpCard from '~/components/FaceUpCard';
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
    <div class={`relative flex justify-center my-5`}>
        <For each={props.cards}>
            {(card, index) => (
                <FaceUpCard
                    value={card}
                    style={{
                        transform: `rotate(${calculateAngle(index(), props.cards.length).toString()}deg)`,
                    }}
                    class='absolute origin-bottom'
                    onClick={() => {
                        console.log(
                            `Player ${props.playerName} clicked on card ${card.rank} of ${card.suit}`,
                        );
                        props.cards.splice(index(), 1);
                    }}
                />
            )}
        </For>
    </div>
);

export default PlayerHand;
