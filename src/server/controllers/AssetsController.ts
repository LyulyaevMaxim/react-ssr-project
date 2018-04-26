import * as Hapi from 'hapi';
import * as path from 'path';
import IController from './IController';

class AssetsController implements IController {
    mapRoutes(server: Hapi.Server): void {
        server.route({
            method: 'GET',
            path: '/assets/{file*}',
            options: {
                cache: {
                    expiresIn: 1209600, //2 недели: 60 * 60 * 24 * 7 * 2
                    privacy: 'private'
                },
                handler: (request: Hapi.Request, h: any/*inert.ResponseToolkit*/) => {
                    const file: string = path.resolve(__dirname, `../../public${request.path}`);
                    return h.file(file);
                }
            }
        });
    }

}

export default AssetsController;
