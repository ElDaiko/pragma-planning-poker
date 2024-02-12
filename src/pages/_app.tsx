import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { UserProvider } from "../context/user.context";
import { PartyProvider } from "@/context/party.context";
import { useEffect } from "react";
import { Classroom } from "../types/classroom"
import { Params } from "../types/paramId"
import { Player } from "@/types/player";
import { usePartyContext } from "@/hooks/usePartyContext";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <PartyProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </PartyProvider>
  );
}