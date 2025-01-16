import { For } from 'solid-js';

import FaceDownCard from '~/components/FaceDownCard';
import { OpponentHandCardState } from '~/components/Game';

export type OpponentHandProps = {
    playerName: string;
    cardStates: OpponentHandCardState[];
};

const OpponentHand = (props: OpponentHandProps) => (
    <ol class='flex list-none flex-row items-center justify-center'>
        <For each={props.cardStates}>
            {(state, _) => (
                <FaceDownCard
                    ref={state.ref.inner}
                    isVisible={state.isVisible}
                    handIndex={state.index}
                />
            )}
        </For>
    </ol>
);

export default OpponentHand;
