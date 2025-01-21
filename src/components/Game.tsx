import Deck from '~/components/Deck';
import MovingCards from '~/components/MovingCards';
import OpponentHand from '~/components/OpponentHand';
import PlayerHand from '~/components/PlayerHand';
import useGameState from '~/game-logic/game-state';

export type HtmlRef<T extends HTMLElement> = { inner: T };

export type GameProps = {
    playerName: string;
};

const Game = (props: GameProps) => {
    let deckRef!: HTMLLIElement;
    const state = useGameState();
    return (
        <div class='grid h-screen auto-rows-fr grid-cols-1 gap-4'>
            <OpponentHand playerName='Opponent' />
            <Deck
                ref={deckRef}
                onCardDrawn={(card) => {
                    state.playerDrawnCard(card);
                }}
            />
            <PlayerHand playerName={props.playerName} />
            <MovingCards
                deckPosition={deckRef.getBoundingClientRect()}
                onFinishedMoving={(index) => {
                    state.cardHasFinishedMovingToPlayerHand(index());
                }}
            />
        </div>
    );
};

export default Game;
