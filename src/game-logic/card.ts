export type Rank =
    | 'A'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | 'J'
    | 'Q'
    | 'K';

export type Suit = 'Clubs' | 'Diamonds' | 'Hearts' | 'Spades';

export type PlayingCard = {
    suit: Suit;
    rank: Rank;
};
