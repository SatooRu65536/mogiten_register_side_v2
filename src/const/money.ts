import { MoneyType } from '../types';

export const moneyTypes = [
  {
    amount: 1,
    name: '1円',
  },
  {
    amount: 5,
    name: '5円',
  },
  {
    amount: 10,
    name: '10円',
  },
  {
    amount: 50,
    name: '50円',
  },
  {
    amount: 100,
    name: '100円',
  },
  {
    amount: 500,
    name: '500円',
  },
  {
    amount: 1000,
    name: '1000円',
  },
  {
    amount: 2000,
    name: '2000円',
  },
  {
    amount: 5000,
    name: '5000円',
  },
  {
    amount: 10_000,
    name: '10000円',
  },
] as const satisfies MoneyType[];
