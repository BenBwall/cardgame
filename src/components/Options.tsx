export type OptionsProps = {
    class?: string | undefined;
};

const Options = (props: OptionsProps) => (
    <div class={`fixed top-60 left-0 ${props.class ?? ''}`}>
        Options Oh Boy!
    </div>
);

export default Options;
