import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { UserProvider } from "../context/user.context";
import { PartyProvider } from "@/context/party.context";
import config from '../amplifyconfiguration.json';
import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
Amplify.configure(config);


function MyApp({ Component, pageProps, user, signOut }: AppProps & WithAuthenticatorProps) {
  return (
    <PartyProvider>
      <UserProvider>
        <Component {...pageProps} />
        <button onClick={signOut}>Sign out</button>
      </UserProvider>
    </PartyProvider>
  );
}

export default withAuthenticator(MyApp);

