"use client";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import axiosCreator from "axios";

export function useCreateParty() {
  const router = useRouter();

  const axios = axiosCreator.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
    },
  });

  async function createParty(partyName: string) {
    try {
        const response: AxiosResponse<{ classRoomId: string }> = await axios({
            url: "/classroom",
            method: "POST",
            data: { "name": partyName }
        })
        const { classRoomId } = response.data;
        router.push(`/poker-table/${classRoomId}`)

    } catch (error) {
        if (error ) {
            console.log(error);
        }
    }
  }

  return { createParty};
}
