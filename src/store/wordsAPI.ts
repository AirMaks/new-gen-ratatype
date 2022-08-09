import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const wordsAPI = createApi({
  reducerPath: "words/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://random-word-api.herokuapp.com",
  }),
  endpoints: (build) => ({
    fetchWords: build.query<string[], number>({
      query: (number: number = 7) => ({
        url: "/word",
        params: {
          number,
        },
      }),
    }),
  }),
});
