const script = `{const e=localStorage.getItem("theme");if(null!==e&&"system"!==e)document.documentElement.setAttribute("data-theme",e);else{const e=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("data-theme",e?"dark":"light")}}`;

const ThemeScript = (props: { nonce?: string }) => (
    <script id='theme-script' nonce={props.nonce}>
        {script}
    </script>
);

export default ThemeScript;
