import * as React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {History, createMemoryHistory} from 'history';
import {StaticRouter} from 'react-router';
import {Route, Switch, Redirect} from 'react-router-dom';

import Header from '~components/header';
import Footer from '~components/footer';
import AboutAsync from '~components/about';
import ContactsAsync from '~components/contacts';

import IStore from '~stores/IStore';
import ISagaStore from '~stores/ISagaStore';

// const styles = require('~css/index.scss')
// const styles = require('./assets/styles/index.scss')

interface IProviderWrapperProps {
    store: ISagaStore<IStore>;
    isServerSide: boolean;
    location?: string;
    context?: any;
    history?: History;
}

const RouterWrapper: React.StatelessComponent<IProviderWrapperProps> = (props: IProviderWrapperProps): JSX.Element => {
    const Router: any = props.isServerSide ? StaticRouter : ConnectedRouter;
    const history: History = props.isServerSide ? createMemoryHistory() : props.history;

    return (
        <Provider store={props.store}>
            <Router
                context={props.context}
                location={props.location}
                history={history}
            >
                <React.Fragment>
                    <Header/>
                    <Switch>
                        <Route
                            exact={true}
                            path="/"
                            component={AboutAsync}
                        />
                        <Route
                            path="/contact"
                            component={ContactsAsync}
                        />
                        <Redirect
                            from="/old-path"
                            to="/"
                        />
                    </Switch>
                    <Footer/>
                </React.Fragment>
            </Router>
        </Provider>
    );
};

export default RouterWrapper;
