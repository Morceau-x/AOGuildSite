import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Connect from '../errors/Connect';
import { State } from '../../store/Reducer';

export default function PrivateRoute(props: RouteProps) {
    const { component, children, ...routeProps } = props;
    const authenticated = useSelector((state: State) => state.auth.authenticated);

    return (
        <Route
            {...routeProps}
            component={authenticated ? component : authenticated == undefined ? null : Connect}
            children={authenticated ? children : authenticated == undefined ? null : <Connect />}
        />
    );
}
