import { For } from 'solid-js';

import FaceDownCard from '~/components/FaceDownCard';
import useGameState from '~/game-logic/game-state';

export type OpponentHandProps = {
    playerName: string;
};

const OpponentHand = (props: OpponentHandProps) => {
    const _ = props;
    const state = useGameState();
    return (
        <ul class='flex list-none flex-row items-center justify-center'>
            <For each={state.opponentHand()}>
                {(state, _) => (
                    <FaceDownCard
                        ref={state.ref.inner}
                        isVisible={state.isVisible}
                        handIndex={state.index}
                    />
                )}
            </For>
        </ul>
    );
};

export default OpponentHand;
