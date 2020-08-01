export default interface UserModel {
    id: string;
    username: string;
    discriminator: string;
    groups: [];
    permissions: string[];
}
