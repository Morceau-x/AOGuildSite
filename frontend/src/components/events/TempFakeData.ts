import EventModel, { EventFilterType } from '../../models/EventModel';

export const fakeEvents: EventModel[] = [
    Object.assign(new EventModel(), {
        id: '1',
        owner: '1',
        name: 'Test 1',
        canceled: false,
        public: true,
        openDateTime: Date.now() + 86400000,
        closeDateTime: Date.now() + 86400000 * 2,
        readyDateTime: Date.now() + 86400000 * 3,
        startDateTime: Date.now() + 86400000 * 4,
        endDateTime: Date.now() + 86400000 * 5,

        official: false,
        officialOptions: {},

        type: 'ZvZ',
        description: 'On va KCDQ!',

        participants: {
            slots: 50,
            remainingSlots: 5,
        },
    }),
    Object.assign(new EventModel(), {
        id: '2',
        name: 'Test 2',
        canceled: false,
        public: false,
        publicDateTime: Date.now() + 86400000,
        openDateTime: Date.now() + 86400000 * 2,
        closeDateTime: Date.now() + 86400000 * 3,
        readyDateTime: Date.now() + 86400000 * 4,
        startDateTime: Date.now() + 86400000 * 5,
        endDateTime: Date.now() + 86400000 * 6,

        official: true,
        officialOptions: {},

        type: 'ZvZ',
        description: 'On va KCDQ!',

        // TODO
        build: {
            minimumIP: 1200,
            stuffLevelHint: 'Equivalent T7',
            numberOfStuffs: 1,
            buildValidation: true,
            guildGivesBuild: false,
        },
        participants: {
            slots: 'unlimited',
        },
    }),
    Object.assign(new EventModel(), {
        id: '3',
        owner: '1',
        name: 'Test 3',
        canceled: false,
        public: false,
        openDateTime: Date.now() - 86400000,
        closeDateTime: Date.now() + 86400000 * 3,
        readyDateTime: Date.now() + 86400000 * 4,
        startDateTime: Date.now() + 86400000 * 5,
        endDateTime: Date.now() + 86400000 * 6,

        official: true,
        officialOptions: {},

        type: 'ZvZ',
        description: 'On va KCDQ!',

        meetingPoint: 'Ile de guilde de Lymhurst',

        // TODO
        build: {
            minimumIP: 1000,
            maximumIP: 1300,
            stuffLevelHint: 'Equivalent T7',
            numberOfStuffs: 3,
            buildValidation: true,
            guildGivesBuild: true,
        },
        participants: {
            slots: 50,
            blacklist: [
                {
                    type: EventFilterType.GROUP,
                    value: 'tonnelet',
                },
            ],
        },
    }),
    Object.assign(new EventModel(), {
        id: '4',
        name: 'Test 4',
        canceled: false,
        public: false,
        openDateTime: Date.now() - 86400000 * 2,
        closeDateTime: Date.now() - 86400000,
        readyDateTime: Date.now(),
        startDateTime: Date.now() + 86400000,
        endDateTime: Date.now() + 86400000 * 2,

        official: false,
        officialOptions: {},

        type: 'ZvZ',
        description: 'On va KCDQ!',

        // TODO
        build: {
            maximumIP: 1200,
            stuffLevelHint: 'Equivalent T7',
            numberOfStuffs: 3,
            buildValidation: true,
            guildGivesBuild: false,
        },
        participants: {
            slots: 50,
        },
    }),
    Object.assign(new EventModel(), {
        id: '5',
        owner: '1',
        name: 'Test 5',
        canceled: false,
        public: false,
        openDateTime: Date.now() - 86400000 * 3,
        closeDateTime: Date.now() - 86400000 * 2,
        readyDateTime: Date.now() - 86400000,
        startDateTime: Date.now(),
        endDateTime: Date.now() + 86400000,

        official: true,
        officialOptions: {},

        type: 'ZvZ',
        description: 'On va KCDQ!',

        // TODO
        build: {
            stuffLevelHint: 'Equivalent T7',
            numberOfStuffs: 3,
            buildValidation: true,
            guildGivesBuild: false,
        },
        participants: {
            slots: 50,
        },
    }),
    Object.assign(new EventModel(), {
        id: '6',
        name: 'Test 6',
        canceled: false,
        public: false,
        openDateTime: Date.now() - 86400000 * 4,
        closeDateTime: Date.now() - 86400000 * 3,
        readyDateTime: Date.now() - 86400000 * 2,
        startDateTime: Date.now() - 86400000,
        endDateTime: Date.now(),

        official: true,
        officialOptions: {},

        type: 'ZvZ',
        description: 'On va KCDQ!',

        build: {
            minimumIP: 2000,
            stuffLevelHint: 'Equivalent T7',
            numberOfStuffs: 3,
            buildValidation: true,
            guildGivesBuild: true,
        },
        participants: {
            slots: 500,
            remainingSlots: 500,
            whitelist: [
                {
                    type: EventFilterType.GROUP,
                    value: 'tonneau',
                },
                {
                    type: EventFilterType.USER,
                    value: 'morceaux',
                },
            ],
        },
    }),
];
