import { For } from 'solid-js';

import FaceUpCard from '~/components/FaceUpCard';
import useGameState from '~/components/GameStateProvider';

export type PlayerHandProps = {
    playerName: string;
    class?: string | undefined;
};

const PlayerHand = (props: PlayerHandProps) => {
    const state = useGameState();
    return (
        <ul class={`justify-self-center ${props.class ?? ''}`}>
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
                            state.unHoverCard();
                        }}
                        style={{
                            transform: `rotate(${state.calculateCurveInPlayerHand(index()).toString()}deg)`,
                        }}
                        class='absolute origin-bottom transition duration-300 ease-out hover:scale-150'
                        value={card.value}
                    />
                )}
            </For>
        </ul>
    );
};

export default PlayerHand;
