import { API_BASE_URL } from '../../Globals';
import AxiosApi from './AxiosApi';
import { fakeEvents } from '../../components/events/TempFakeData';
import EventModel from '../../models/EventModel';
import { Action } from 'redux';
import { CancelEventAction } from '../../store/events/EventsTypes';

export default class EventsApi extends AxiosApi {
    constructor() {
        super();
        this.network = this.withCsrf({
            baseURL: `${API_BASE_URL}auth/`,
        });
    }

    getEvents = (): Promise<EventModel[]> => {
        const fakePromise = async () => {
            return Promise.resolve(Object.assign([], fakeEvents));
        };

        return fakePromise();
        //return this.basicGetData(this.network, 'user/');
    };

    cancelEvent = (action: CancelEventAction): Promise<EventModel[]> => {
        const fakePromise = async () => {
            const events = Object.assign([], fakeEvents);
            const event = events.find((e) => e.id == action.eventId);
            if (!event) return Promise.reject('Event not found');
            event.canceled = true;
            return Promise.resolve(events);
        };

        return fakePromise();
    };
}
