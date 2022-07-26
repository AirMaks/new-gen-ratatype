import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IWords } from "../models/IWords";

export const wordsAPI = createApi({
  reducerPath: "words/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://random-word-api.herokuapp.com",
  }),
  endpoints: (build) => ({
    fetchWords: build.query<IWords[], number>({
      query: (number: number = 7) => ({
        url: "/word",
        params: {
          number,
        },
      }),
    }),
  }),
});
