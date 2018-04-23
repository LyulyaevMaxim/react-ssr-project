import { asyncComponent } from 'react-async-component';

const FooterAsync = asyncComponent({
  name: 'FooterAsync',
  serverMode: 'defer',
  resolve: () => require('./footer'),
});

export default FooterAsync;
