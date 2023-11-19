/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { mockPokemonResponse } from './mockPokemon';

const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon/', ({ request }) => {
    const url = new URL(request.url);
    url.searchParams.set('limit', '20');
    url.searchParams.set('offset', '0');

    return HttpResponse.json(mockPokemonResponse);
  }),
];

export default setupServer(...handlers);
