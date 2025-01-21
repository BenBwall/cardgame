import { JSX } from 'solid-js';
import { createMutable } from 'solid-js/store';

import { DEFAULT_DECK, PlayingDeck } from '~/game-logic/card';
import {
    GameState,
    GameStateContextProvider,
    GameStateMethods,
} from '~/game-logic/game-state';
import { shuffle } from '~/util/array';
import createSSRSafe from '~/util/ssr-safe';

export type GameStateProviderProps = {
    children: JSX.Element;
};

const generateStartingCards = () => shuffle([...DEFAULT_DECK] as PlayingDeck);

const GameStateProvider = (props: GameStateProviderProps) => {
    const startingDeck = createSSRSafe(generateStartingCards);
    const gameState = createMutable<GameState>(
        {
            deck: startingDeck,
            movingCards: [],
            opponentHand: [],
            playerHand: { cards: [], numHovered: 0 },
        },
        { name: 'Game State' },
    );
    return (
        <GameStateContextProvider value={new GameStateMethods(gameState)}>
            {props.children}
        </GameStateContextProvider>
    );
};

export default GameStateProvider;
