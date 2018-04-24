import * as React from 'react';
import { NavLink } from 'react-router-dom';
// import {get} from "lodash";
// import styles from '~css/index.scss';
// const styles = require("~css/header.scss");

// console.log(get({ 'a': [{ 'b': { 'c': 3 } }] }, 'a[0].b.c'));
// console.log(styles);

interface IProps { }
interface IState { }

// console.log("styles", styles, require("./header.scss"));

class Header extends React.Component<IProps, IState> {

  public render(): JSX.Element {
    return (
      <div className="header clearfix">
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

export default Header;
