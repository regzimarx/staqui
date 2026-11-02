import { Config } from '@remotion/cli/config';
import path from 'node:path';
Config.overrideWebpackConfig(config => ({
  ...config,
  resolve: {...config.resolve, alias: {...config.resolve?.alias,
    '@staqforce-studio/staqui': path.resolve('../../packages/ui/src/index.ts'),
    'react': path.resolve('node_modules/react'),
    'react-dom': path.resolve('node_modules/react-dom')
  }}
}));
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
