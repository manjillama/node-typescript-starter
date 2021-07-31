import prodKeys from './prod';
import devKeys from './dev';
import ciKeys from './ci';
import { config } from '..';

type Config = {
  MONGO_URI: string;
};
// eslint-disable-next-line import/no-mutable-exports
let keys: Config;

if (process.env.NODE_ENV === config.envs.PROD) keys = prodKeys;
else if (process.env.NODE_ENV === config.envs.TEST) keys = ciKeys;
else keys = devKeys;

export { keys };
