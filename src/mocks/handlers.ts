/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  http.get('', ({ request }) => {
    const url = new URL(request.url);
    url.searchParams.set('limit', '20');
    url.searchParams.set('offset', '0');

    return HttpResponse.json();
  }),
];

export default setupServer(...handlers);
