import 'fetch-everywhere';
import * as inert from 'inert';
import AssetsController from './controllers/AssetsController';
import HapiWebpackHotPlugin from './plugin/HapiWebpackHotPlugin';
import ReactController from './controllers/ReactController';
import ServerManager from './ServerManager';

(async () => {

  const manager = new ServerManager();

  await manager.registerPlugin(inert);

  if (manager.isDevelopment) {
    const hapiWebpackHotPlugin = new HapiWebpackHotPlugin();

    await manager.registerPlugin(hapiWebpackHotPlugin.plugin);
  }

  manager.registerController(new AssetsController());
  manager.registerController(new ReactController());

  await manager.startServer();

})();
