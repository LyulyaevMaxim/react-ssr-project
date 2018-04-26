import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { hot } from 'react-hot-loader'
import * as logo from 'arrow-top-green.svg';
// import * as styles from './header.scss';
// import {get} from "lodash";
// console.log(get({ 'a': [{ 'b': { 'c': 3 } }] }, 'a[0].b.c'));
// console.log(`header: ${styles}`)
interface IProps { }
interface IState { }

class Header extends React.Component<IProps, IState> {

  public render(): JSX.Element {
    return (
      <div /*className={styles['header']}*/>
        <img src={logo} alt="" />
        <nav>
          <ul className="nav nav-pills float-right">
            <li className="nav-item">
              <NavLink
                exact={true}
                className="nav-link"
                activeClassName="active"
                to="/"
              >
                {'About'}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/contact"
              >
                {'Contact'}
              </NavLink>
            </li>
          </ul>
        </nav>
        <h3 className="text-muted">{'Star My Github Repo!'}</h3>
      </div>
    );
  }

}


export default hot(module)(Header)
