import { useTheme } from '~/components/ThemeProvider';

const DarkModeButton = () => {
    const theme = useTheme();
    return (
        <button
            on:click={() => {
                theme.toggle();
            }}
        >
            Toggle Dark Mode
        </button>
    );
};

export default DarkModeButton;
