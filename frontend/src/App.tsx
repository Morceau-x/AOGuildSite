import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/nav/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import Store from './store/Store';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Routes from './components/Routes';
import { CssBaseline } from '@material-ui/core';
import { appTheme } from './Theme';
import { fetchUser } from './store/auth/AuthTypes';

const theme = createMuiTheme(appTheme);

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
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
