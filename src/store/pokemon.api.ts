import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import pokemonService from "../api/PokemonService";
import { ISearchParams } from "../models/params.interface";
import { IPokemonDetails } from "../models/response.interface";

export const pokemonApi = createApi({
  reducerPath: "pokemon",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/pokemon/",
  }),
  endpoints: (build) => ({
    pokemon: build.query<IPokemonDetails, ISearchParams>({
      queryFn: async ({ searchTerm, page, limit }) => {
        if (searchTerm) {
          try {
            const pokemon = await pokemonService.getPokemonByQuery(searchTerm);
            return { data: { count: 1, pokemon: [pokemon] } };
          } catch {
            return { data: { count: 0, pokemon: [] } };
          }
        }
        const offset = (page - 1) * limit;
        const pokemon = await pokemonService.getAllPokemon(limit, offset);
        return { data: pokemon };
      },
    }),
    // pokemonList: build.query<IPokemon[], ISearchParams>({
    //   query: ({ limit, searchTerm, page }) => {
    //     const offset = (page - 1) * limit;
    //     return {
    //       url: searchTerm ?? '',
    //       params: {
    //         limit,
    //         offset,
    //       },
    //     };
    //   },
    // }),
  }),
});

export const {
  usePokemonQuery,
  useLazyPokemonQuery,
  util: { getRunningQueriesThunk },
} = pokemonApi;

export const { pokemon: getPokemon } = pokemonApi.endpoints;
