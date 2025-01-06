export type FaceDownCardProps = {
    handIndex?: number;
    onClick?: () => void;
};

const FaceDownCard = (props: FaceDownCardProps) => (
    <button
        class='h-28 w-20 content-center rounded border border-black bg-blue-500 p-2 text-center dark:bg-blue-700'
        on:click={props.onClick}
    >
        {props.handIndex}
    </button>
);

export default FaceDownCard;
