const Card = () => {
    const _ = void 0;
    return (
        <div class='inline-block perspective-distant place-self-center'>
            <div class='relative w-20 h-28 cursor-pointer duration-600 ease-in-out transform-3d active:rotate-x-180'>
                <div class='card-side z-2 bg-white font-bold' />
                <div class='card-side bg-lime-500 rotate-x-180' />
            </div>
        </div>
    );
};

export default Card;
