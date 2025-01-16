import { FixedSizeArray } from '~/util/array';

export const RANKS = Object.freeze([
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
] as const);

export type Rank = (typeof RANKS)[number];

export const SUITS = Object.freeze([
    'Clubs',
    'Diamonds',
    'Hearts',
    'Spades',
] as const);
export type Suit = (typeof SUITS)[number];

export type PlayingCard = Readonly<{
    suit: Suit;
    rank: Rank;
}>;
export const PLAYING_DECK_SIZE = 52;
// 52 card deck. 13 ranks, 4 suits.
export type PlayingDeck = FixedSizeArray<PlayingCard, typeof PLAYING_DECK_SIZE>;

export const DEFAULT_DECK: Readonly<PlayingDeck> = Object.freeze(
    SUITS.flatMap((suit) =>
        RANKS.map((rank) => Object.freeze({ rank, suit })),
    ) as PlayingDeck,
);

export const isSameCard = (a: PlayingCard, b: PlayingCard) =>
    a.rank === b.rank && a.suit === b.suit;
