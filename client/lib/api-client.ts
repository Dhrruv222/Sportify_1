import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
});
