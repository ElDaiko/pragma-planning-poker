"use client";
import {  AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosCreator from "axios";

export function useCreateParty() {
    const router = useRouter()

    const axios = axiosCreator.create({
        baseURL: "http://localhost:8080",
        headers: {
            "Content-Type": "application/json"
        }
    })

    async function createParty(classRoomName: string) {
        try {
            const response: AxiosResponse<{ classRoomId: string }> = await axios({
                url: "/classroom",
                method: "POST",
                data: { "name": classRoomName }
            })

            const { classRoomId } = response.data;
            router.push(`/poker-table/${classRoomId}`)

        } catch (error) {
            if (error) {
            console.log(error);
            
        }
    }
    }
    return { createParty }

}