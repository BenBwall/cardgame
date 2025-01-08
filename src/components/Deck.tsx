import Card from '~/components/Card';
import { PlayingCard } from '~/game-logic/card';
import { Show } from 'solid-js';

export type DeckProps = {
    cards: PlayingCard[];
    onCardDrawn: (card: PlayingCard) => void;
};

const EmptyDeck = () => (
    <div class='flex justify-center rounded border border-black bg-gray-200 p-2'>
        <p class='h-28 w-20 text-gray-500'>Empty Deck</p>
    </div>
);

const Deck = (props: DeckProps) => (
    <div class='content-center rounded bg-green-500 text-center dark:bg-green-700'>
        <div class='bg-green-700 dark:bg-green-500'>
            <Show when={props.cards.length > 0} fallback={<EmptyDeck />}>
                <Card
                    isFaceUp={false}
                    onClick={() => {
                        const card = props.cards.pop();
                        if (card !== undefined) {
                            props.onCardDrawn(card);
                        }
                    }}
                    value={props.cards[props.cards.length - 1]}
                    handIndex={undefined}
                />
            </Show>
        </div>
    </div>
);

export default Deck;
