import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { UserProvider } from "../context/user.context";
import { PartyProvider } from "@/context/party.context";
import config from '../amplifyconfiguration.json';
import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
Amplify.configure(config);
import styles from '../styles/poker-creation.module.scss';

I18n.setLanguage('es')


function MyApp({ Component, pageProps, user, signOut }: AppProps & WithAuthenticatorProps) {
  return (
    <PartyProvider>
      <UserProvider>
        <Component {...pageProps} />
        <button className={`global__button ${styles['logout-button']}`} onClick={signOut}>Cerrar sesión</button>
      </UserProvider>
    </PartyProvider>
  );
}

export default withAuthenticator(MyApp);

