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

const Card = ({ value: { suit, rank } }: CardProps) => (
    <div class='card border border-black p-2 rounded w-20 h-28 flex flex-col justify-between items-center bg-white'>
        <div class='rank text-xl font-bold'>{rank}</div>
        <div
            class={`suit text-xl ${isRedSuit(suit) ? 'text-red-500' : 'text-black'}`}
        >
            {suitSymbols[suit]}
        </div>
        <div class='rank text-xl font-bold rotate-180'>{rank}</div>
    </div>
);

export default Card;
