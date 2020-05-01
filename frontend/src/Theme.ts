import { ThemeOptions } from '@material-ui/core';

export const appTheme: ThemeOptions = {
    palette: {
        type: 'light',
        text: {
            primary: '#000',
            secondary: '#2e4572',
        },
        primary: {
            light: '#2e4572',
            main: '#1E2C49',
            dark: '#1E2C49',
            contrastText: '#fff',
        },
        secondary: {
            light: '#FDF9E5',
            main: '#EDB33D',
            dark: '#EDB33D',
            contrastText: '#000',
        },
    },
    typography: {
        fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
        h6: {
            fontSize: '1.25rem',
            textTransform: 'capitalize',
        },
    },
};
