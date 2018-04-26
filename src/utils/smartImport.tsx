import * as React from 'react'
import { asyncComponent } from 'react-async-component';
import {hot} from 'react-hot-loader'

export default function smartImport({module, moduleName}) {
    return hot(module)(asyncComponent({
        name: `${moduleName}Async`,
        serverMode: 'resolve',
        resolve: () => typeof module === 'function' ? ({ __esModule: true, default: module }) :
            require(/* webpackChunkName: `${moduleName}` */`../components/${moduleName}/${moduleName}`)
    }))
}
