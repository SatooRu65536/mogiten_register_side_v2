import styles from './index.module.scss';
import { itemGroup } from '../../const/items';
import ItemCard from './ItemCard';
import { entries } from '../../utils';
import { Decrement, Increament } from '../../hooks/use-orders';
import { Order } from '../../types';

interface Props {
  orders: Order[];
  increament: Increament;
  decrement: Decrement;
}

export default function ItemList({ orders, increament, decrement }: Props) {
  return (
    <section className={styles.item_list}>
      {entries(itemGroup).map(([category, items]) => (
        <div key={category} className={styles.category}>
          <h2 className={styles.category_name}>{category}</h2>

          <div className={styles.items}>
            {items.map((item) => (
              <ItemCard key={item.name} item={item} orders={orders} increament={increament} decrement={decrement} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
