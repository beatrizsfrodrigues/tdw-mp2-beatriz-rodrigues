import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL;

export const nookipediaApi = createApi({
  reducerPath: "nookipediaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      headers.set("X-API-KEY", apiKey);
      headers.set("Accept-Version", "1.7.0");
      return headers;
    },
    async onError({ error, meta }) {
      console.error("API Error:", error);
    },
  }),
  endpoints: (builder) => ({
    getVillagers: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `villagers?${queryString}`;
      },
    }),
  }),
});

// localStorage.setItem("villagers", nookipediaApi.data);

export const { useGetVillagersQuery } = nookipediaApi;
