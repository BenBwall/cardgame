const OptionsContents = () => (
    <fieldset class='m-0 hidden h-0 w-0 p-0 peer-has-checked:block'>
        <legend>Settings</legend>
        WOW
    </fieldset>
);

const Options = () => (
    <div class='fixed inset-y-1/2 m-0 p-0'>
        <div class='peer m-0 p-0'>
            <input class='hidden' type='checkbox' id='options-hamburger' />
            <label
                class='m-0 rotate-180 cursor-pointer bg-gray-500 px-3 py-0 [writing-mode:vertical-lr]'
                for='options-hamburger'
            >
                Options
            </label>
        </div>
        <OptionsContents />
    </div>
);

export default Options;
