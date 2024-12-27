import { Accessor, createSignal, For, Setter, Signal } from 'solid-js';
import Card, { PlayingCard } from './Card';

export interface HandProps {
    playerName: string;
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

const Hand = (props: HandProps) => {
    const hand = new PlayerHand(
        createSignal([] as PlayingCard[], {
            equals: false,
            name: `${props.playerName}'s Hand`,
        }),
    );
    hand.drawCard({ rank: 'Ace', suit: 'Hearts' });

    return (
        <div class='hand flex gap-2'>
            <For each={hand.cards()}>{(card) => Card({ value: card })}</For>
        </div>
    );
};

export default Hand;
