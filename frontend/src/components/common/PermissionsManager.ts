export enum Permission {
    SEE_PRIVATE_EVENTS,
    EDIT_EVENTS,
    CANCEL_EVENTS,
    MANAGE_EVENT_PARTICIPANTS,
}

export default class PermissionsManager {
    permissions: Permission[];
    constructor(permsStringList: string[]) {
        this.permissions = [];
        for (const value of permsStringList) {
            const permission = this.getPermission(value);
            if (permission) this.permissions.push(permission);
        }
    }

    hasPermission = (permission: Permission): boolean => {
        return this.permissions.includes(permission);
    };

    getPermission = (value: string): Permission | undefined => {
        switch (value) {
            case 'access_private_events':
                return Permission.SEE_PRIVATE_EVENTS;
            case 'AlbionPlayer.edit_all_events':
                return Permission.EDIT_EVENTS;
            case 'AlbionPlayer.cancel_all_events':
                return Permission.CANCEL_EVENTS;
            case 'AlbionPlayer.manage_all_events_participants':
                return Permission.MANAGE_EVENT_PARTICIPANTS;
            default:
                return undefined;
        }
    };
}
