import * as React from 'react';
import { DiscordIcon } from '../../common/icons/SocialIcons';
import NavItem from '../NavItem';
import { API_BASE_URL } from '../../../Globals';

AuthButton.defaultProps = {
    current: undefined,
    required: undefined,
};

export default function AuthButton(props: { current: boolean | undefined; required: boolean | undefined }) {
    const url = `${API_BASE_URL}auth/authenticate/`;
    console.log(process.env.NODE_ENV);
    return (
        <form action={url} method="post" style={{ display: 'flex' }}>
            <input type="text" defaultValue={location.href} name="redirect_uri" style={{ display: 'none' }} />
            <input type="text" defaultValue={1} name="user_id" style={{ display: 'none' }} />
            <NavItem text=" Connexion" buttonProps={{ type: 'submit', startIcon: <DiscordIcon /> }} auth={props} />
        </form>
    );
}
