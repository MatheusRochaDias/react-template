// src/features/whitelabel/index.ts
import { acaiRepublicConfig } from './acaiRepublic';
import { jdsWingzConfig } from './jdsWingz';

const configs: { [key: string]: any } = {
  acaiRepublic: acaiRepublicConfig,
  jdsWingz: jdsWingzConfig,
};

export const getClientConfig = () => {
  return configs[process.env.NEXT_PUBLIC_CLIENT_NAME || 'default'] || undefined;
};
