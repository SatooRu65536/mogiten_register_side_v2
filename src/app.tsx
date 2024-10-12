import styles from './app.module.scss';
import Controller from './components/Controller';
import Functions from './components/Functions';
import ItemList from './components/ItemList';
import useOrder from './hooks/use-orders';

export default function App() {
  const { orders, increament, decrement, functions, controller } = useOrder();

  return (
    <main className={styles.main}>
      <ItemList orders={orders} increament={increament} decrement={decrement} />
      <Functions functions={functions} />
      <Controller controller={controller} />
    </main>
  );
}
