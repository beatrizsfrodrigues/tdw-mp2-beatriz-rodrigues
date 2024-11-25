import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const animalCrossingApi = createApi({
  reducerPath: "animalCrossingApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://acnhapi.com/v1/" }),
  endpoints: (builder) => ({
    getAnimalCrossingCharacters: builder.query({
      query: () => "villagers",
    }),
  }),
});

export const { useGetAnimalCrossingCharactersQuery } = animalCrossingApi;
