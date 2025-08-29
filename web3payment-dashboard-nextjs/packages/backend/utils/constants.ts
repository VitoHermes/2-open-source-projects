import { base, baseSepolia } from 'wagmi/chains';

export const deploymentEnv = process.env.NEXT_PUBLIC_DEPLOYMENT_ENV;
export const isProd = deploymentEnv === 'production' || deploymentEnv === 'prod';
export const isDevelopment = !isProd;

export const DEFAULT_CHAIN = isProd ? base : baseSepolia;
