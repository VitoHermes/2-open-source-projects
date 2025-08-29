import { type Hex } from 'viem';

export type AddressBook = {
  id: string;
  name: string;
  email?: string;
  wallet?: Hex;
  createdAt?: string;
  updatedAt?: string;
};

export type Address = {
  id: string;
  name: string;
  email?: string;
  wallet: Hex;
  userId: string;
};
