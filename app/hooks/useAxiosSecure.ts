"use client";

import axios from "axios";
import { useSession } from "next-auth/react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export default function useAxiosSecure() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  axiosSecure.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return axiosSecure;
}
