import { useRouter } from "next/router";

import { IPokemonDetails } from "../../models/response.interface";
import ItemResults from "../ItemResults/ItemResults";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import styles from "./ListResults.module.css";

type ListResultsProps = {
  data: IPokemonDetails;
};

export default function ListResults(props: ListResultsProps) {
  const { data } = props;

  const router = useRouter();
  const { page, limit, searchTerm } = router.query;

  const href = {
    pathname: "/",
    query: { limit, page, searchTerm },
  };

  const handleItemClick = () => {
    router.push(href);
  };

  return !data.pokemon ? (
    <Loader />
  ) : (
    <div
      className={styles["container-results"]}
      onClick={handleItemClick}
      data-testid="results"
    >
      <Pagination count={data.count} />
      <ul className={styles["block-results"]}>
        {data.pokemon.map((item) => (
          <ItemResults item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
