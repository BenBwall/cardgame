import { For } from 'solid-js';

import FaceUpCard from '~/components/FaceUpCard';
import { PlayerHandCardState } from '~/components/Game';

export type PlayerHandProps = {
    cardStates: PlayerHandCardState[];
    playerName: string;
    numHovered: number;
    setNumHovered: (num: number) => void;
};

const BASE_CARD_CURVE_IN_DEGREES = 270;
const CURVE_MULTIPLIER = 1.5;

export const calculateAngle = (
    index: number,
    numCards: number,
    curve: number,
) => (curve / numCards) * (index + 1) - (curve / 2 + curve / numCards / 2);

export const cardCurve = (numHovered: number) =>
    numHovered > 0 ?
        BASE_CARD_CURVE_IN_DEGREES * CURVE_MULTIPLIER
    :   BASE_CARD_CURVE_IN_DEGREES;

const PlayerHand = (props: PlayerHandProps) => (
    <ul class='relative my-5 flex justify-center hover:p-5'>
        <For each={props.cardStates}>
            {(state, index) => (
                <FaceUpCard
                    ref={state.ref.inner}
                    isVisible={state.isVisible}
                    onClick={() => {
                        props.cardStates.splice(index(), 1);
                    }}
                    onMouseEnter={() => {
                        state.isHovered = true;
                        props.setNumHovered(props.numHovered + 1);
                    }}
                    onMouseLeave={() => {
                        state.isHovered = false;
                        props.setNumHovered(props.numHovered - 1);
                    }}
                    style={{
                        transform: `rotate(${calculateAngle(index(), props.cardStates.length, cardCurve(props.numHovered)).toString()}deg)`,
                    }}
                    class='absolute origin-bottom transition-transform duration-300 ease-out hover:scale-150 hover:*:[.card-text]:scale-75'
                    value={state.value}
                />
            )}
        </For>
    </ul>
);

export default PlayerHand;
