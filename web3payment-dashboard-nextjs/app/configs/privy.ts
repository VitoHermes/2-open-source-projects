import { DEFAULT_CHAIN } from '@/app/utils/constants';
import { supportedChains } from '@/packages/backend/configs/wagmi';
import type { PrivyClientConfig } from '@privy-io/react-auth';

export const privyConfig: PrivyClientConfig = {
  appearance: {
    showWalletLoginFirst: false,
    theme: 'light',
    accentColor: '#456DFF',
    walletChainType: 'ethereum-only',
  },
  loginMethods: ['email', 'wallet'],
  defaultChain: DEFAULT_CHAIN,
  supportedChains: [...supportedChains],
  externalWallets: {
    coinbaseWallet: {
      connectionOptions: 'all',
    },
    walletConnect: {
      enabled: true,
    },
  },
  embeddedWallets: {
    ethereum: {
      createOnLogin: 'users-without-wallets',
    },
  },
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  walletConnectCloudProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
};
