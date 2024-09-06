import {createTheme} from "@mantine/core";

export const theme = createTheme({
    primaryColor: "myYellow",
    autoContrast: true,
    fontFamily: 'Segoe UI, Roboto, Helvetica Neue, sans-serif',
    headings: { fontFamily: 'Segoe UI, Roboto, Helvetica Neue, sans-serif' },
    colors: {
        bgColor: [
            // light variants
            '#FFFFFF',
            '#F6F7F8',
            // dark variants
            '#333333',
            '#202020',
        ],
        myYellow: [
            '#fff6e6',
            '#ffebcc',
            '#ffe099',
            '#ffd566',
            '#ffc93d',
            '#FFDD2D',
            '#FFCD33',
            '#f9b12a',
            '#FAB619',
            '#d99714',
        ],
        myOrange: [
            "#fff8e1",
            "#ffefcc",
            "#ffdd9b",
            "#ffca64",
            "#ffba38",
            "#ffb01b",
            "#ffab09",
            "#e39500",
            "#ca8500",
            "#af7100"
        ],
        prodGreen: [
            '#e6f3ef',
            '#cce7df',
            '#99cfbf',
            '#66b89f',
            '#33a07f',
            '#00885f',
            '#007854',
            '#006749',
            '#00563f',
            '#00402E',
        ],
        dark: [
            "#d0d0d0",
            "#b3b3b3",
            "#999999",
            "#7f7f7f",
            "#666666",
            "#4c4c4c",
            "#333333",
            "#2e2e2e",
            "#1f1f1f",
            "#141414",
        ],
        light: [
            "#FFFFFF",
            "#F6F7F8",
            "#EAEAEA",
            "#DADADA",
            "#C8C8C8",
            "#B8B8B8",
            "#A8A8A8",
            "#9E9E9E",
            "#8C8C8C",
            "#7A7A7A",
        ],
    }
})