import { asyncComponent } from 'react-async-component';

const FooterAsync = asyncComponent({
  name: 'FooterAsync',
  serverMode: 'defer',
  resolve: () => {
    return import(/* webpackChunkName: "Footer" */ './footer');
  },
});

export default FooterAsync;
