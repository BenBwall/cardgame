const script =
    '{let e=localStorage.getItem("theme");e=null!==e&&"system"!==e?e:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",e);}';

export type ThemeScriptProps = {
    nonce?: string;
};

const ThemeScript = (props: ThemeScriptProps) => (
    <script nonce={props.nonce}>{script}</script>
);

export default ThemeScript;
