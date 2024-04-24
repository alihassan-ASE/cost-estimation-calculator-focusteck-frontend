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
                }
                @font-face {
                    font-family: 'Aeonik';
                    src: url('../fonts/Aeonik/Aeonik-Light.otf') format('opentype');
                }
                @font-face {
                    font-family: 'Aeonik';
                    src: url('../fonts/Aeonik/Aeonik-Medium.otf') format('opentype');
                }
                @font-face {
                    font-family: 'Aeonik';
                    src: url('../fonts/Aeonik/Aeonik-Bold.otf') format('opentype');
                }
                `,
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