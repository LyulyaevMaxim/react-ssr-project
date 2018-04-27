import * as Hapi from 'hapi';
import IController from './controllers/IController';

class ServerManager {
    static readonly PORT: number = parseInt(process.env.PORT, 10) || 5000;
    // static readonly HOST: string = process.env.HOST || 'localhost';
    static readonly NODE_ENV: string = process.env.NODE_ENV;

    isDevelopment: boolean = (ServerManager.NODE_ENV === 'development');

    private _server: Hapi.Server = null;

    get server(): Hapi.Server { return this._server; }

    constructor() {
        const options: Hapi.ServerOptions = {
            // host: ServerManager.HOST,
            port: ServerManager.PORT,
        };

        this._server = new Hapi.Server(options);
    }

    static log(): void {
        console.info(`\n\nServer running in ${ServerManager.NODE_ENV} mode at: http://${ServerManager.HOST}:${ServerManager.PORT}\n`);
    }

    async registerPlugin(pluginConfig: any): Promise<void> {
        await this._server.register(pluginConfig);
    }

    registerController(controller: IController): void {
        controller.mapRoutes(this._server);
    }

    async startServer(): Promise<void> {
        try {
            await this._server.start();

            if (!this.isDevelopment) {
                ServerManager.log();
            }
        } catch (err) {
            console.error(err);
        }
    }

}

export default ServerManager;
