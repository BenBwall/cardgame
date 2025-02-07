import { createContext, JSX, useContext } from 'solid-js';

import GameStateMethods from '~/game-logic/game-state';
import { assertNotUndef } from '~/util/not-undef';

const GameStateContext = createContext<GameStateMethods>(undefined, {
    name: 'Game State Context',
});

const useGameState = () =>
    assertNotUndef(
        useContext(GameStateContext),
        'useGameState must be used within a GameStateProvider',
    );

export default useGameState;

export type GameStateProviderProps = {
    children: JSX.Element;
};

export const GameStateProvider = (props: GameStateProviderProps) => (
    <GameStateContext.Provider value={new GameStateMethods()}>
        {props.children}
    </GameStateContext.Provider>
);
