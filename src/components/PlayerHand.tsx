import { For } from 'solid-js';

import FaceUpCard from '~/components/FaceUpCard';
import { PlayerHandCardState } from '~/components/Game';

export type PlayerHandProps = {
    cardStates: PlayerHandCardState[];
    playerName: string;
};

const CARD_CURVE_IN_DEGREES = 270;

const calculateAngle = (index: number, numCards: number) =>
    (CARD_CURVE_IN_DEGREES / numCards) * (index + 1) -
    (CARD_CURVE_IN_DEGREES / 2 + CARD_CURVE_IN_DEGREES / numCards / 2);

const PlayerHand = (props: PlayerHandProps) => (
    <ol class='relative my-5 flex list-none justify-center'>
        <For each={props.cardStates}>
            {(state, index) => (
                <FaceUpCard
                    ref={state.ref.inner}
                    isVisible={state.isVisible}
                    onClick={() => {
                        props.cardStates.splice(index(), 1);
                    }}
                    style={{
                        transform: `rotate(${calculateAngle(index(), props.cardStates.length).toString()}deg)`,
                    }}
                    class='absolute origin-bottom'
                    value={state.value}
                />
            )}
        </For>
    </ol>
);

export default PlayerHand;
