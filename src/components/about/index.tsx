import { asyncComponent } from 'react-async-component';

const AboutAsync = asyncComponent({
  name: 'AboutAsync',
  serverMode: 'resolve',
  resolve: () => {
    return import(/* webpackChunkName: "About" */ './about');
  },
});

export default AboutAsync;
