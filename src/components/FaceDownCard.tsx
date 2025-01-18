type FaceDownCardProps = {
    handIndex?: number;
    isVisible: boolean;
    ref?: HTMLLIElement;
    onClick?: () => void;
};

const FaceDownCard = (props: FaceDownCardProps) => (
    <li
        data-is-visible={props.isVisible.toString()}
        class='flex place-self-center bg-blue-500 data-[is-visible=false]:collapse dark:bg-blue-700'
        ref={props.ref}
    >
        <button
            class='h-28 w-20'
            on:click={() => {
                props.onClick?.();
            }}
        >
            {props.handIndex}
        </button>
    </li>
);

export default FaceDownCard;
