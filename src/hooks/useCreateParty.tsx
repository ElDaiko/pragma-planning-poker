"use client";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import axiosCreator from "axios";

export function useCreateParty() {
  const router = useRouter();

  const axios = axiosCreator.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
    },
  });

  async function createParty(classRoomName: string) {
    try {
      const response: AxiosResponse<{ partyId: string }> = await axios({
        url: "/classroom",
        method: "POST",
        data: { name: classRoomName },
      });
      router.push(`/poker-table/${response.data}`);
    } catch (error) {
      if (error) {
        console.log("ERROR CREANDO SALA");
      }
    }
  }

  return { createParty };
}
