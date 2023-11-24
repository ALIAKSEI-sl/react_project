import ErrorBoundary from "@/components/ErrorBoundary";
import { wrapper } from "@/store/appStore";

import type { AppProps } from "next/app";
export function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(App);
