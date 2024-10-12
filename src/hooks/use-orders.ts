import { useState } from 'react';
import { Order } from '../types';
import { itemGroup, itemList } from '../const/items';

export default function useOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [id, setId] = useState(0);

  // 商品を+1する
  const increament = (itemName: string) => {
    setOrders((orders_) => {
      const clonedOrders = structuredClone(orders_);
      const orderIndex = clonedOrders.findIndex((i) => i.name === itemName);

      if (orderIndex !== -1) {
        clonedOrders[orderIndex].quantity += 1;
        return clonedOrders;
      }

      const price = itemList.find((i) => i.name === itemName)?.price;
      if (price === undefined) {
        alert('商品が見つかりません');
        return clonedOrders;
      }
      clonedOrders.push({ name: itemName, price, quantity: 1 });

      return clonedOrders;
    });
  };

  // 商品を-1する
  const decrement = (itemName: string) => {
    setOrders((orders_) => {
      const orders = structuredClone(orders_);
      const orderIndex = orders.findIndex((i) => i.name === itemName);

      if (orderIndex === -1) return orders;

      if (orders[orderIndex].quantity === 1) orders.splice(orderIndex, 1);
      else orders[orderIndex].quantity -= 1;

      return orders;
    });
  };

  // food 全て+1する
  const increamentAllFood = () => {
    const foods = structuredClone(itemGroup.food);
    const clonedOrders = structuredClone(orders);

    for (const food of foods) {
      const orderIndex = clonedOrders.findIndex(({ name }) => name === food.name);
      if (orderIndex === -1) clonedOrders.push({ name: food.name, price: food.price, quantity: 1 });
      else clonedOrders[orderIndex].quantity += 1;
    }
    setOrders(clonedOrders);
  };

  // food 全て-1する
  const decrementAllFood = () => {
    const foods = structuredClone(itemGroup.food);
    const clonedOrders = structuredClone(orders);

    for (const order_ of structuredClone(clonedOrders)) {
      const food = foods.find((f) => f.name === order_.name);
      if (food === undefined) continue;

      const orderIndex = clonedOrders.findIndex((i) => i.name === order_.name);
      if (orderIndex === -1) continue;

      if (clonedOrders[orderIndex].quantity === 1) clonedOrders.splice(orderIndex, 1);
      else clonedOrders[orderIndex].quantity -= 1;
    }

    setOrders(clonedOrders);
  };

  // クリップボードにコピー
  const copy2clipboard = () => {
    const sortedOrders = orders.sort((a, b) => a.name.localeCompare(b.name));
    const orderText = sortedOrders.map((o) => `${o.name}: ${o.quantity}`).join('\n');
    const slackText = `[${id}]\n${orderText}`;
    setId((prev) => prev + 1);
    navigator.clipboard.writeText(slackText).catch(() => alert('コピーに失敗しました'));
  };

  // 初期化
  const init = () => {
    setOrders([]);
  };

  const total = orders.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

  return {
    orders,
    total,
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
