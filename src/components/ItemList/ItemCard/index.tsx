import styles from './index.module.scss';
import { Item, Order } from '../../../types';
import { Decrement, Increament } from '../../../hooks/use-orders';

interface Props {
  item: Item;
  orders: Order[];
  increament: Increament;
  decrement: Decrement;
}

export default function ItemCard({ item, orders, increament, decrement }: Props) {
  const quantity = orders.find((o) => o.name === item.name)?.quantity ?? 0;

  return (
    <div className={styles.item_card}>
      <button className={styles.item_name} onClick={() => increament(item.name)} disabled={quantity >= 50}>
        {item.name}
      </button>

      <p className={styles.quantity}>{quantity}</p>

      <button className={styles.decrement} onClick={() => decrement(item.name)} disabled={quantity <= 0}>
        -
      </button>
    </div>
  );
}
