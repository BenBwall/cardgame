import { JSX } from 'solid-js';
import { createMutable } from 'solid-js/store';

import {
    defaultGameState,
    GameState,
    GameStateContextProvider,
    GameStateMethods,
} from '~/game-logic/game-state';

export type GameStateProviderProps = {
    children: JSX.Element;
};

const GameStateProvider = (props: GameStateProviderProps) => {
    const gameState = createMutable<GameState>(defaultGameState(), {
        name: 'Game State',
    });
    return (
        <GameStateContextProvider value={new GameStateMethods(gameState)}>
            {props.children}
        </GameStateContextProvider>
    );
};

export default GameStateProvider;
