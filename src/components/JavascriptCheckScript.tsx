/**
 * Script that ensured Javascript is enabled before rendering the game.
 */
const JavaScriptCheckScript = (props: { nonce?: string }) => (
    <script nonce={props.nonce}>
        document.getElementById("app").classList.remove("hidden");
    </script>
);

export default JavaScriptCheckScript;
