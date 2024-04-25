import { createTheme } from "@mui/material/styles";
// import AeonikRegular from "../fonts/Aeonik/Aeonik-Regular.otf";

const appTheme = createTheme({
    typography: {
        fontFamily: 'Aeonik, Poppins',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides:
                `@font-face {
                    font-family: 'Aeonik';
                    src: url('../fonts/Aeonik/Aeonik-Regular.otf') format('opentype');
                    font-weight: 400;
                }
                @font-face {
                    font-family: 'Aeonik';
                    src: url('../fonts/Aeonik/Aeonik-Thin.otf') format('opentype');
                    font-weight: 250;
                }
                @font-face {
                    font-family: 'Aeonik';
                    src: url('../fonts/Aeonik/Aeonik-Light.otf') format('opentype');
                    font-weight: 300;
                }
                @font-face {
                    font-family: 'Aeonik';
                    src: url('../fonts/Aeonik/Aeonik-Medium.otf') format('opentype');
                    font-weight: 500;
                }
                @font-face {
                    font-family: 'Aeonik';
                    src: url('../fonts/Aeonik/Aeonik-Bold.otf') format('opentype');
                    font-weight: 700;
                }`,
        },
    },
    palette: {
        primary: {
            main: '#005DBD'
        },
        secondary: {
            main: '#F58D12'
        },
        default: {
            main: '#000000'
        },
        warning: {
            main: '#FAC935'
        }
    },
});

export default appTheme;