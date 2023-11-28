import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { IPokemon } from "../../models/response.interface";
import styles from "./ItemResults.module.css";

type ItemProps = {
  item: IPokemon;
};

export default function ItemResults(props: ItemProps) {
  const { item } = props;
  const router = useRouter();
  const { page, limit, searchTerm } = router.query;

  const href = {
    pathname: `/details/${item.id}`,
    query: { limit, page, searchTerm },
  };

  const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  return (
    <Link href={href} onClick={handleItemClick}>
      <li className={styles.card}>
        <Image
          className={styles["card-img"]}
          src={item.sprites.other.dream_world.front_default}
          alt={item.name}
          width="300"
          height="300"
        />
        <h2>{item.name}</h2>
        <p>
          <strong>types: </strong>
          {item.types.map((t) => t.type.name).join(", ")}
        </p>
      </li>
    </Link>
  );
}
