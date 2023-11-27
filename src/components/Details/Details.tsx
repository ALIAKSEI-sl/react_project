import { useRouter } from "next/router";

import { IPokemon } from "@/models/response.interface";

import DetailsItem from "../DetailsItem/DetailsItem";
import Loader from "../Loader/Loader";
import styles from "./Details.module.css";

type DetailsProps = {
  data: IPokemon;
};

export default function Details(props: DetailsProps) {
  const { data } = props;
  const defaultParams = { page: 1, limit: 20 };

  const router = useRouter();
  const { page, limit, searchTerm } = router.query;

  const href = {
    pathname: "/",
    query: { limit, page, searchTerm },
  };

  const closeDetails = () => {
    router.push(href);
  };

  return (
    <div className={styles["container-details"]}>
      <p className={styles["header-details"]}>details</p>
      {!data ? (
        <Loader />
      ) : (
        <>
          <button
            type="button"
            onClick={closeDetails}
            className={styles["details-close"]}
          >
            X
          </button>
          <DetailsItem item={data} />
        </>
      )}
    </div>
  );
}
