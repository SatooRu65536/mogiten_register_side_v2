import styles from './index.module.scss';
import { DecrementAllFood, IncreamentAllFood } from '../../hooks/use-orders';

interface Props {
  functions: {
    increamentAllFood: IncreamentAllFood;
    decrementAllFood: DecrementAllFood;
  };
}

export default function Functions({ functions }: Props) {
  return (
    <section className={styles.function_area}>
      <button onClick={functions.decrementAllFood}>全て-1</button>
      <button onClick={functions.increamentAllFood}>全て+1</button>
    </section>
  );
}
