import AuthApi from '../remotes/AuthApi';
import EventsApi from '../remotes/EventsApi';
import EventModel from '../../models/EventModel';
import { Action } from 'redux';
import { CancelEventAction } from '../../store/events/EventsTypes';

export default class EventsRepository {
    remote: EventsApi;

    constructor() {
        this.remote = new EventsApi();
    }

    fetchEvents = (): Promise<EventModel[]> => {
        return this.remote.getEvents();
    };

    cancelEvents = (action: CancelEventAction): Promise<EventModel[]> => {
        return this.remote.cancelEvent(action);
    };
}
