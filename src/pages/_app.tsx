import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { UserProvider } from "../context/user.context";
import { PartyProvider } from "@/context/party.context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PartyProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </PartyProvider>
  );
}
