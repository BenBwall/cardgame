export type Rank =
    | 'Ace'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | 'Jack'
    | 'Queen'
    | 'King';

export type Suit = 'Clubs' | 'Diamonds' | 'Hearts' | 'Spades';

export interface PlayingCard {
    suit: Suit;
    rank: Rank;
}

export interface CardProps {
    value: PlayingCard;
}

const suitSymbols: Record<Suit, string> = {
    Clubs: '♣',
    Diamonds: '♦',
    Hearts: '♥',
    Spades: '♠',
};

const isRedSuit = (suit: Suit) => suit === 'Diamonds' || suit === 'Hearts';

const Card = (props: CardProps) => (
    <div class='border border-black p-2 rounded w-20 h-28 flex flex-col justify-between items-center bg-white'>
        <div class='text-xl font-bold'>{props.value.rank}</div>
        <div
            class={`text-xl ${isRedSuit(props.value.suit) ? 'text-red-500' : 'text-black'}`}
        >
            {suitSymbols[props.value.suit]}
        </div>
        <div class='text-xl font-bold rotate-180'>{props.value.rank}</div>
    </div>
);

export default Card;
