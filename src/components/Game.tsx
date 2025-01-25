import Deck from '~/components/Deck';
import MovingCards from '~/components/MovingCards';
import OpponentHand from '~/components/OpponentHand';
import Options from '~/components/Options';
import PlayerHand from '~/components/PlayerHand';
import useGameState from '~/game-logic/game-state';

export type HtmlRef<T extends HTMLElement> = { inner: T };

export type GameProps = {
    playerName: string;
};

const Game = (props: GameProps) => {
    let deckRef!: HTMLElement;
    const state = useGameState();
    return (
        <div
            class='grid h-screen w-screen gap-4'
            style={{
                'grid-template-areas':
                    '"opponent-hand opponent-hand" "deck deck" "options player-hand";',
            }}
        >
            <OpponentHand
                playerName='Opponent'
                class='[grid-area:opponent-hand]'
            />
            <Deck
                class='[grid-area:deck]'
                ref={deckRef}
                onCardDrawn={(card) => {
                    state.playerDrawnCard(card);
                }}
            />
            <Options class='[grid-area:options]' />
            <PlayerHand
                class='[grid-area:player-hand]'
                playerName={props.playerName}
            />
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
