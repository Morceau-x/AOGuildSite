import * as React from 'react';
import { DiscordIcon } from '../../common/icons/SocialIcons';
import NavItem from '../NavItem';

AuthButton.defaultProps = {
    current: undefined,
    required: undefined,
};

export default function AuthButton(props: { current: boolean | undefined; required: boolean | undefined }) {
    const url = 'https://api.tsf-albion.fr/auth/authenticate/';
    return (
        <form action={url} method="post" style={{ display: 'flex' }}>
            <input type="text" defaultValue={location.href} name="redirect_uri" style={{ display: 'none' }} />
            <NavItem text=" Connexion" iconBefore={<DiscordIcon />} buttonProps={{ type: 'submit' }} authentication={props} />
        </form>
    );
}
