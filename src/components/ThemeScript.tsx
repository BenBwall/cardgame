const script =
    '{const e=localStorage.getItem("theme");null!==e&&"system"!==e?document.documentElement.setAttribute("data-theme",e):document.documentElement.setAttribute("data-theme",window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}';

const ThemeScript = (props: { nonce?: string }) => (
    <script id='theme-script' nonce={props.nonce}>
        {script}
    </script>
);

export default ThemeScript;
