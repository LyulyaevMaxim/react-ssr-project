import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { hot } from 'react-hot-loader'
import * as logo from 'arrow-top-green.svg'
// import {get} from "lodash";
// import styles from '~css/index.scss';
// const styles = require("~css/header.scss");
// console.log(get({ 'a': [{ 'b': { 'c': 3 } }] }, 'a[0].b.c'));
// console.log(styles);
// const path = require('path');
// const img = require('~img/arrow-top-green.svg')
// console.log( require(path.resolve(__dirname, '../../public/assets/media/arrow-top-green.svg')));
// console.log("styles", styles, require("./header.scss"));

interface IProps { }
interface IState { }

class Header extends React.Component<IProps, IState> {

  public render(): JSX.Element {
    return (
      <div className="header clearfix">
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
