import { For } from 'solid-js';

import FaceUpCard from '~/components/FaceUpCard';
import useGameState from '~/game-logic/game-state';

export type PlayerHandProps = {
    playerName: string;
};

const PlayerHand = (props: PlayerHandProps) => {
    const _ = props;
    const state = useGameState();
    return (
        <ul class='flex justify-center'>
            <For each={state.playerHand()}>
                {(card, index) => (
                    <FaceUpCard
                        ref={card.ref.inner}
                        isVisible={card.isVisible}
                        onClick={() => {
                            state.playCard(index());
                        }}
                        onMouseEnter={() => {
                            state.hoverCard(index());
                        }}
                        onMouseLeave={() => {
                            state.unHoverCard(index());
                        }}
                        style={{
                            transform: `rotate(${state.calculateCurveInPlayerHand(index()).toString()}deg)`,
                        }}
                        class='absolute origin-bottom transition-transform duration-300 ease-out hover:scale-150'
                        value={card.value}
                    />
                )}
            </For>
        </ul>
    );
};

export default PlayerHand;
