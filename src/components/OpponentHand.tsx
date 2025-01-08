import Card from '~/components/Card';
import { For } from 'solid-js';

export type OpponentHandProps = {
    playerName: string;
    cardDrawnIndices: number[];
};

const OpponentHand = (props: OpponentHandProps) => (
    <div class='flex flex-row items-center justify-center'>
        <For each={props.cardDrawnIndices}>
            {(cardDrawnIndex, i) => (
                <Card
                    isFaceUp={false}
                    handIndex={cardDrawnIndex}
                    onClick={() => {
                        props.cardDrawnIndices.splice(i(), 1);
                    }}
                    value={{ rank: '6', suit: 'Hearts' }}
                />
            )}
        </For>
    </div>
);

export default OpponentHand;
