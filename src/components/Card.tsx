import { IFormStore } from '../models/form.interface';
import styles from '../styles/Main.module.css';

interface CardProps {
  data: IFormStore;
  isLast: boolean;
}

export default function Card(props: CardProps) {
  const {
    data: { name, age, email, gender, img, countries },
    isLast,
  } = props;

  return (
    <div className={isLast ? styles.lastCard : styles.card}>
      <div>
        <img src={img} alt="img" className={styles.img} />
      </div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <p>Gender: {gender}</p>
      <p>Countries: {countries}</p>
    </div>
  );
}
