import { Provider } from 'react-redux';

import { store } from './appStore';

export default function ReduxProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
