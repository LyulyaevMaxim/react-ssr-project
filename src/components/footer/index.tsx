import { asyncComponent } from 'react-async-component';

const FooterAsync = asyncComponent({
    name: 'FooterAsync',
    serverMode: 'resolve',
    resolve: () => require(/* webpackChunkName: "Footer" */ './footer')
});

export default FooterAsync;
