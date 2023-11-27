import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { IPokemonDetails } from '@/models/response.interface';
import { wrapper } from '@/store/appStore';
import { getPokemon, getRunningQueriesThunk } from '@/store/pokemon.api';

import RootLayout from './layout';

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

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const pokemonDetails = props.pokemon.data as IPokemonDetails;

  return (
    <main>
      <RootLayout data={pokemonDetails} />
    </main>
  );
}
