import { useTheme } from '~/components/ThemeProvider';

const DarkModeButton = () => {
    const theme = useTheme();
    return (
        <button
            on:click={() => {
                theme.toggle();
            }}
        >
            <p>Toggle Dark Mode</p>
        </button>
    );
};

export default DarkModeButton;
