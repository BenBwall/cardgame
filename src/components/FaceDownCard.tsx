type FaceDownCardProps = {
    handIndex?: number;
    isVisible: boolean;
    ref?: HTMLLIElement;
    onClick?: () => void;
};

const FaceDownCard = (props: FaceDownCardProps) => (
    <li
        data-is-visible={props.isVisible.toString()}
        class='card-side rotate-x-180 bg-blue-500 data-[is-visible=false]:collapse dark:bg-blue-700'
        ref={props.ref}
    >
        <button
            on:click={() => {
                props.onClick?.();
            }}
        >
            {props.handIndex}
        </button>
    </li>
);

export default FaceDownCard;
