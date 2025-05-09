import { FixedSizeArray } from '~/util/array';

export const RANKS = [
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
] as const;

export type Rank = (typeof RANKS)[number];

export const SUITS = ['Clubs', 'Diamonds', 'Hearts', 'Spades'] as const;

export type Suit = (typeof SUITS)[number];

export type PlayingCard = Readonly<{
    suit: Suit;
    rank: Rank;
}>;

export const PLAYING_DECK_SIZE = 52;

// 52 card deck. 13 ranks, 4 suits.
export type PlayingDeck = FixedSizeArray<PlayingCard, typeof PLAYING_DECK_SIZE>;

export const DEFAULT_DECK: Readonly<PlayingDeck> = SUITS.flatMap((suit) =>
    RANKS.map(
        (rank) =>
            ({
                rank,
                suit,
            }) as const,
    ),
) as PlayingDeck;

export const isSameCard = (a: PlayingCard, b: PlayingCard) =>
    a.rank === b.rank && a.suit === b.suit;

export type CardSortKey = 'rank-then-suit' | 'suit-then-rank';

export type CardSortConfig = {
    sortKey: CardSortKey;
    acesAreHigh: false;
};

// eslint-disable-next-line consistent-return
const quantifyRank = (rank: Rank, acesAreHigh: boolean) => {
    switch (rank) {
        case 'A':
            // eslint-disable-next-line no-magic-numbers
            return acesAreHigh ? 14 : 1;
        case '2':
            return 2;
        case '3':
            return 3;
        case '4':
            return 4;
        case '5':
            return 5;
        case '6':
            return 6;
        case '7':
            return 7;
        case '8':
            return 8;
        case '9':
            return 9;
        case '10':
            // eslint-disable-next-line no-magic-numbers
            return 10;
        case 'J':
            // eslint-disable-next-line no-magic-numbers
            return 11;
        case 'Q':
            // eslint-disable-next-line no-magic-numbers
            return 12;
        case 'K':
            // eslint-disable-next-line no-magic-numbers
            return 13;
    }
};

const compareRanks = (a: Rank, b: Rank, acesAreHigh: boolean) =>
    quantifyRank(a, acesAreHigh) - quantifyRank(b, acesAreHigh);

// eslint-disable-next-line consistent-return
const quantifySuit = (suit: Suit) => {
    switch (suit) {
        case 'Hearts':
            return 0;
        case 'Diamonds':
            return 1;
        case 'Spades':
            return 2;
        case 'Clubs':
            return 3;
    }
};

const compareSuits = (a: Suit, b: Suit) => quantifySuit(a) - quantifySuit(b);

export const compareCards = (
    a: PlayingCard,
    b: PlayingCard,
    config: CardSortConfig,
    // eslint-disable-next-line consistent-return
) => {
    const byRank = compareRanks(a.rank, b.rank, config.acesAreHigh);
    const bySuit = compareSuits(a.suit, b.suit);
    switch (config.sortKey) {
        case 'rank-then-suit': {
            if (byRank !== 0) {
                return byRank;
            }
            return bySuit;
        }
        case 'suit-then-rank': {
            if (bySuit !== 0) {
                return bySuit;
            }
            return byRank;
        }
    }
};
