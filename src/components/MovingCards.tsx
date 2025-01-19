import { Accessor, For } from 'solid-js';

import { PlayerHandCardState } from '~/components/Game';
import MovingCard from '~/components/MovingCard';
import { calculateAngle, cardCurve } from '~/components/PlayerHand';
import { PlayingCard } from '~/game-logic/card';
import findIndexAndValue from '~/util/find-index-and-value';
import { assertNotUndef } from '~/util/not-undef';
import { Position2d } from '~/util/position';

export type MovingCardsProps = {
    cards: PlayingCard[];
    playerHand: PlayerHandCardState[];
    onFinishedMoving?: (index: Accessor<number>) => void;
    deckPosition: Position2d;
    numHovered: number;
};

const MovingCards = (props: MovingCardsProps) => {
    const targetPosition = (
        card: PlayingCard,
        playerHand: PlayerHandCardState[],
    ) => {
        const [state, index] = assertNotUndef(
            findIndexAndValue(playerHand, (c) => c.value === card),
            'Card not found in player hand',
        );

        const pos = state.ref.inner.getBoundingClientRect();

        const rotation = calculateAngle(
            index,
            playerHand.length,
            cardCurve(props.numHovered),
        );

        return {
            rotation,
            x: pos.x,
            y: pos.y,
        };
    };
    return (
        <div>
            <For each={props.cards}>
                {(card, index) => (
                    <MovingCard
                        card={card}
                        startPosition={props.deckPosition}
                        targetPosition={targetPosition(card, props.playerHand)}
                        onFinishedMoving={() => props.onFinishedMoving?.(index)}
                    />
                )}
            </For>
        </div>
    );
};

export default MovingCards;
