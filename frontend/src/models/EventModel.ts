export enum EventStatus {
    OPEN,
    UPCOMING,
    CLOSED,
    ONGOING,
    FINISHED,
    CANCELED,
}

export enum EventFilterType {
    USER,
    PERMISSION,
    GROUP,
}

export interface EventParticipantFilter {
    type: EventFilterType;
    value: string;
}

export interface EventBuildOptions {
    minimumIP?: number;
    maximumIP?: number;
    stuffLevelHint: string;
    numberOfStuffs: number;
    buildValidation: boolean;
    guildGivesBuild: boolean;
}

export interface EventParticipantsOptions {
    slots: number | 'unlimited';
    remainingSlots?: number;
    whitelist?: EventParticipantFilter[];
    blacklist?: EventParticipantFilter[];
}

export default class EventModel {
    id: string;
    owner: string;
    name: string;
    type: string;
    description: string;

    canceled: boolean;
    public: boolean;
    publicDateTime?: number;
    openDateTime: number;
    closeDateTime: number;
    readyDateTime: number;
    startDateTime: number;
    endDateTime: number;

    official: boolean;
    officialOptions?: {}; // TODO

    // TODO
    build: EventBuildOptions;
    participants: EventParticipantsOptions;

    meetingPoint: string;
    getStatus = (): EventStatus => {
        if (this.canceled) return EventStatus.CANCELED;
        const now = Date.now();
        if (now < this.openDateTime) return EventStatus.UPCOMING;
        if (now < this.closeDateTime) return EventStatus.OPEN;
        if (now < this.startDateTime) return EventStatus.CLOSED;
        if (now < this.endDateTime) return EventStatus.ONGOING;
        return EventStatus.FINISHED;
    };
}
