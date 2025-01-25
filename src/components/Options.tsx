export type OptionsProps = {
    class?: string | undefined;
};

const Options = (props: OptionsProps) => (
    <div class={props.class ?? ''}>Options Oh Boy!</div>
);

export default Options;
