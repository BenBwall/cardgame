import { JSX } from 'solid-js';

type FaceDownCardProps = {
    handIndex?: number;
    isVisible: boolean;
    ref?: HTMLElement;
    onClick?: () => void;
    class?: string | undefined;
    style?: JSX.CSSProperties | string | undefined;
};

const FaceDownCard = (props: FaceDownCardProps) => (
    <li class='contents'>
        <button
            data-is-visible={props.isVisible.toString()}
            class={`box-border flex h-28 w-20 bg-blue-500 hover:cursor-pointer data-[is-visible=false]:collapse dark:bg-blue-700 ${props.class ?? ''}`}
            style={props.style}
            ref={props.ref as HTMLButtonElement}
            on:click={() => {
                props.onClick?.();
            }}
        >
            {props.handIndex}
        </button>
    </li>
);

export default FaceDownCard;
