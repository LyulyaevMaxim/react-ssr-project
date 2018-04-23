import { asyncComponent } from 'react-async-component';

const ContactsAsync = asyncComponent({
  name: 'ContactsAsync',
  serverMode: 'resolve',
  resolve: () => {
    return require(/* webpackChunkName: "Contacts" */ './contacts');
  },
});

export default ContactsAsync;
