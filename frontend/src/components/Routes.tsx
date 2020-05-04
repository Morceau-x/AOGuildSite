import React from 'react';
import { Route, Switch } from 'react-router';
import todo from './todo';
import MainPage from './main/MainPage';
import Profile from './profile/Profile';
import Error404 from './errors/Error404';
import PrivateRoute from './common/PrivateRoute';
import EventsListRoot from './events/list/EventsListRoot';
import EventDetailsRoot from './events/details/EventDetailsRoot';

export default function Routes() {
    return (
        <Switch>
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/event/list" component={EventsListRoot} />
            <PrivateRoute exact path="/event/create" component={todo} />
            <PrivateRoute exact path="/event/:id/details" component={EventDetailsRoot} />

            <Route exact path="/" component={MainPage} />
            <Route component={Error404} />
        </Switch>
    );
}
