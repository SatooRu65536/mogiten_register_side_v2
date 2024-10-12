export interface Item {
  name: string;
  price: number;
}

export type ItemGroup = Record<string, Item[]>;

export interface Order extends Item {
  quantity: number;
}
