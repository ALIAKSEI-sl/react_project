import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import ListResults from "@/components/ListResults/ListResults";
import Search from "@/components/Search/Search";
import { IPokemonDetails } from "@/models/response.interface";
import { useAppSelector } from "@/store/hooks";

import styles from "./page.module.css";

type LayoutProps = {
  children?: React.ReactNode;
  data: IPokemonDetails;
};

export default function RootLayout({ data, children }: LayoutProps) {
  const { limit, page, searchTerm } = useAppSelector((state) => state.search);
  const router = useRouter();

  useEffect(() => {
    const { query } = router;
    if (
      String(limit) !== query.limit ||
      String(page) !== query.page ||
      searchTerm !== query.searchTerm
    ) {
      const href = {
        pathname: "/",
        query: { limit, page, searchTerm },
      };
      router.push(href);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, searchTerm]);

  return (
    <>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="Pokemon search" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Search />
      <hr />
      <div className={styles.layout}>
        <ListResults data={data} />
        {children}
      </div>
    </>
  );
}
