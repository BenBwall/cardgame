/**
 * Script that ensured Javascript is enabled before rendering the game.
 */
export type JavaScriptCheckScriptProps = {
    nonce: string;
};

const JavaScriptCheckScript = (props: JavaScriptCheckScriptProps) => (
    <script nonce={props.nonce}>
        document.getElementById("app").classList.remove("hidden");
    </script>
);

export default JavaScriptCheckScript;
