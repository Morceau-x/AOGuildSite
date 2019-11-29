import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/nav/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import Store from './store/Store';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Routes from './Routes';
import { CssBaseline } from '@material-ui/core';
import { fetchUserAction } from './store/auth/AuthActions';

const theme = createMuiTheme({
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
    },
});

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserAction());
    }, []);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <NavBar />
                    <Routes />
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

const store = Store();
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
