import { ItemGroup } from '../types';

export const itemGroup = {
  drink: [
    {
      name: '飲み物',
      price: 100,
    },
  ],
  food: [
    {
      name: 'もも(タレ)',
      price: 120,
    },
    {
      name: 'もも(塩こしょう)',
      price: 120,
    },
    {
      name: 'ねぎま(タレ)',
      price: 120,
    },
    {
      name: 'ねぎま(塩こしょう)',
      price: 120,
    },
  ],
} as const satisfies ItemGroup;

export const itemList = Object.values(itemGroup).flat();
