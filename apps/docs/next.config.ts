import type { NextConfig } from 'next';
import path from 'node:path';
const config: NextConfig = { transpilePackages: ['@staqforce-studio/staqui'], poweredByHeader: false, devIndicators: false, turbopack: { root: path.resolve(__dirname, '../..') }, outputFileTracingRoot: path.resolve(__dirname, '../..') };
export default config;
