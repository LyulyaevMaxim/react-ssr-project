import * as React from 'react';
// import { hot } from 'react-hot-loader'

interface IProps { }
interface IState { }

class Footer extends React.PureComponent<IProps, IState> {
  render(): JSX.Element {
      const styles = require('./footer.scss')
      console.log(`footer: ${styles}`);
    return (
      <footer className={styles['footer']}>
        <p className={styles.p}>Компонент Footer - асинхронный отложенный компонент. Вместо рендеринга на стороне сервера он лениво загружается в браузере клиента</p>
      </footer>
    );
  }
}

export default Footer
// export default hot(module)(Footer)
