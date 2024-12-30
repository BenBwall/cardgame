export type FaceDownCardProps = {
    handIndex?: number;
    onClick?: () => void;
};

const FaceDownCard = (props: FaceDownCardProps) => (
    <button
        class='border border-black p-2 rounded w-20 h-28 bg-blue-500 dark:bg-blue-700 text-center content-center'
        on:click={props.onClick}
    >
        {props.handIndex}
    </button>
);

export default FaceDownCard;
