import { Accessor, createSignal, For, Setter, Signal } from 'solid-js';
import Card, { PlayingCard } from './Card';

export interface HandProps {
    playerName: string;
    opponent?: boolean;
}

class PlayerHand {
    #getCards: Accessor<PlayingCard[]>;
    #setCards: Setter<PlayingCard[]>;

    constructor(cards: Signal<PlayingCard[]>) {
        [this.#getCards, this.#setCards] = cards;
    }

    drawCard(card: PlayingCard) {
        this.#setCards((cards) => {
            cards.push(card);
            return cards;
        });
    }

    cards() {
        return this.#getCards();
    }
}

const Hand = ({ playerName, opponent = false }: HandProps) => {
    const hand = new PlayerHand(
        createSignal([] as PlayingCard[], {
            equals: false,
            name: `${playerName}'s Hand`,
        }),
    );

    return (
        <div
            class={`hand flex gap-2 ${opponent ? 'flex-row-reverse' : 'flex-row'} bg-amber-100 dark:bg-gray-900 min-h-5`}
        >
            <For each={hand.cards()}>{(card) => Card({ value: card })}</For>
        </div>
    );
};

export default Hand;
