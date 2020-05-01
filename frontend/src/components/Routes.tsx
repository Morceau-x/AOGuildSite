import React from 'react';
import { Route, Switch } from 'react-router';
import todo from './todo';
import MainPage from './main/MainPage';
import Profile from './profile/Profile';
import Error404 from './errors/Error404';
import PrivateRoute from './common/PrivateRoute';
import EventList from './events/EventList';

export default function Routes() {
    return (
        <Switch>
            <PrivateRoute exact path="/todo" component={todo} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/events" component={EventList} />
            <Route exact path="/" component={MainPage} />
            <Route component={Error404} />
        </Switch>
    );
}
