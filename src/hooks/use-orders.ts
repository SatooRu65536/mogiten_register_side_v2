import { useCallback, useState } from 'react';
import { Order } from '../types';
import { itemGroup } from '../const/items';

export default function useOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [id, setId] = useState(0);

  // 商品を+1する
  const increament = useCallback((itemName: string) => {
    setOrders((orders_) => {
      const orders = structuredClone(orders_);
      const orderIndex = orders.findIndex((i) => i.name === itemName);

      if (orderIndex === -1) orders.push({ name: itemName, price: 100, quantity: 1 });
      else orders[orderIndex].quantity += 1;

      return orders;
    });
  }, []);

  // 商品を-1する
  const decrement = useCallback((itemName: string) => {
    setOrders((orders_) => {
      const orders = structuredClone(orders_);
      const orderIndex = orders.findIndex((i) => i.name === itemName);

      if (orderIndex === -1) return orders;

      if (orders[orderIndex].quantity === 1) orders.splice(orderIndex, 1);
      else orders[orderIndex].quantity -= 1;

      return orders;
    });
  }, []);

  // food 全て+1する
  const increamentAllFood = useCallback(() => {
    const foods = structuredClone(itemGroup.food);
    for (const food of foods) increament(food.name);
  }, []);

  // food 全て-1する
  const decrementAllFood = useCallback(() => {
    const foods = structuredClone(itemGroup.food);
    for (const food of foods) decrement(food.name);
  }, []);

  // クリップボードにコピー
  const copy2clipboard = useCallback(() => {
    const sortedOrders = orders.sort((a, b) => a.name.localeCompare(b.name));
    const orderText = sortedOrders.map((o) => `${o.name}: ${o.quantity}`).join('\n');
    const slackText = `[${id}]\n${orderText}`;
    setId((prev) => prev + 1);
    navigator.clipboard.writeText(slackText).catch(() => alert('コピーに失敗しました'));
  }, [orders]);

  // 初期化
  const init = useCallback(() => {
    setOrders([]);
  }, []);

  return {
    orders,
    increament,
    decrement,
    functions: {
      increamentAllFood,
      decrementAllFood,
    },
    controller: {
      copy2clipboard,
      init,
    },
  };
}

// increament
export type Increament = (itemName: string) => void;
// decrement
export type Decrement = (itemName: string) => void;
// increamentAllFood
export type IncreamentAllFood = () => void;
// decrementAllFood
export type DecrementAllFood = () => void;
// copy2clipboard
export type Copy2Clipboard = () => void;
// init
export type Init = () => void;
