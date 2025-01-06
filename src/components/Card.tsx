const Card = () => {
    const _ = void 0;
    return (
        <div class='inline-block place-self-center perspective-distant'>
            <div class='relative h-28 w-20 cursor-pointer duration-600 ease-in-out transform-3d active:rotate-x-180'>
                <div class='card-side z-2 bg-white font-bold' />
                <div class='card-side rotate-x-180 bg-lime-500' />
            </div>
        </div>
    );
};

export default Card;
