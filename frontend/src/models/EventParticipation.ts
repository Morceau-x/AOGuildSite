import UserModel from './UserModel';

export default interface EventParticipant {
    eventId: number;
    user: UserModel;
    build: {}; // TODO
}
