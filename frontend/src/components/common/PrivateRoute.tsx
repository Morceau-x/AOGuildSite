import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FunctionComponent, useState } from 'react';
import Connect from '../errors/Connect';

type PrivateRouteProps = {
    component: FunctionComponent;
} & RouteProps;

export default function PrivateRoute(props: PrivateRouteProps) {
    const { component, ...routeProps } = props;
    const [route, _] = useState(routeProps);

    // @ts-ignore
    const authenticated = useSelector((state) => state.auth.authenticated);

    return (
        <Route
            {...route}
            render={(props) => (authenticated ? <Route {...props} component={component} /> : authenticated == undefined ? <></> : <Connect />)}
        />
    );
}
