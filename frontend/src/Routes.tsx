import React from 'react';
import { Route, Switch } from 'react-router';
import todo from './components/todo';
import MainPage from './components/main/MainPage';
import Profile from './components/profile/Profile';
import Error404 from './components/errors/Error404';
import PrivateRoute from './components/common/PrivateRoute';
import EventList from './components/events/EventList';

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
