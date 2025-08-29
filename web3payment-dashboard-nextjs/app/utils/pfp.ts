import { type User } from '@privy-io/react-auth';

export const pfpURL = (user: User, cacheBust: boolean = true) => {
  return `${process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_URL}/images/${user.id}?sv=${process.env.NEXT_PUBLIC_AZURE_STORAGE_SAS_STRING}${cacheBust ? `&t=${Date.now()}` : ''}`;
};
