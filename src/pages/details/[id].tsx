import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

import Details from "@/components/Details/Details";
import { IPokemon, IPokemonDetails } from "@/models/response.interface";
import { wrapper } from "@/store/appStore";
import { getPokemon, getRunningQueriesThunk } from "@/store/pokemon.api";

import RootLayout from "../layout";

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    const { page, limit, searchTerm } = query;
    const pokemon = await store.dispatch(
      getPokemon.initiate({
        limit: Number(limit) || 20,
        page: Number(page) || 1,
        searchTerm: (searchTerm as string) || "",
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return { props: { pokemon } };
  });

export default function DetailsPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const pokemonDetails = props.pokemon.data as IPokemonDetails;

  const router = useRouter();

  return (
    <main>
      <RootLayout data={pokemonDetails}>
        <Details
          data={
            pokemonDetails.pokemon.find(
              (item) => String(item.id) === (router.query.id as string)
            ) as IPokemon
          }
        />
      </RootLayout>
    </main>
  );
}
