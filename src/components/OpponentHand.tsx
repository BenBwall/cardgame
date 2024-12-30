import FaceDownCard from './FaceDownCard';
import { For } from 'solid-js';

export type OpponentHandProps = {
    playerName: string;
    cardDrawnIndices: number[];
};

const OpponentHand = (props: OpponentHandProps) => (
    <div class='flex flex-row justify-center items-center'>
        <For each={props.cardDrawnIndices}>
            {(cardDrawnIndex, i) => (
                <FaceDownCard
                    handIndex={cardDrawnIndex}
                    onClick={() => {
                        props.cardDrawnIndices.splice(i(), 1);
                    }}
                />
            )}
        </For>
    </div>
);

export default OpponentHand;
