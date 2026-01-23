"use client";

import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://kit-struck.vercel.app",
  withCredentials: true,
});

export default function useAxiosSecure() {
  return axiosSecure;
}
