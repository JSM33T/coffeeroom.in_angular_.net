export default function setTheme() {
    const themeStyleData = localStorage.getItem('themeStyle');
    const themeFontData = localStorage.getItem('themeFont');

    if (themeStyleData != null && themeFontData != null) {
        console.log(themeFontData);
        const themeStyle = document.getElementById('customStyle') as HTMLDivElement;
        //const themeFont = document.getElementById('customFontFamily') as HTMLLinkElement;

        //themeFont.href = themeFontData;

        themeStyle.innerHTML = themeStyleData;
    }
    else
    {
        console.log(themeFontData);
    }
}
