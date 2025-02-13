import Deck from '~/components/Deck';
import useGameState from '~/components/GameStateProvider';
import MovingCards from '~/components/MovingCards';
import OpponentHand from '~/components/OpponentHand';
import Options from '~/components/Options';
import PlayerHand from '~/components/PlayerHand';

export type HtmlRef<T extends HTMLElement> = { inner: T };

export type GameProps = {
    playerName: string;
};

const Game = (props: GameProps) => {
    let deckRef!: HTMLElement;
    const state = useGameState();
    return (
        <>
            <Options />
            <div
                class='grid h-screen w-screen gap-4'
                style={{
                    'grid-template-areas':
                        '"opponent-hand opponent-hand" "deck deck" "player-hand player-hand";',
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
        </>
    );
};

export default Game;
