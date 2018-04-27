import * as React from 'react';
import smartImport from '~utils/smartImport'
import {connect} from 'react-redux';
import MetaAction from '~stores/meta/MetaAction';
import IStore from '~stores/IStore';
import {Dispatch} from 'redux';
import IMetaReducerState from '~stores/meta/IMetaReducerState';

const styles = require('./about.scss')

interface IState {
}

interface IProps {
}

interface IStateToProps {
}

interface IDispatchToProps {
    setMeta: (meta: IMetaReducerState) => void;
}

const mapStateToProps = (state: IStore): IStateToProps => ({});
const mapDispatchToProps = (dispatch: Dispatch<IStore>): IDispatchToProps => ({
    setMeta: (meta: IMetaReducerState) => dispatch(MetaAction.setMeta(meta)),
});

class About extends React.Component<IStateToProps & IDispatchToProps & IProps, IState> {
    componentWillMount(): void {
        this.props.setMeta({title: 'About Page'});
    }

    render(): JSX.Element {
        const libs = [
            {title: 'Webpack 4', description: 'Facilitates creating builds for production, staging, and development'},
            {title: 'React', description: 'Library to build user interfaces'},
            {title: 'Redux', description: 'Manages data state in your application'},
            {title: 'React Router 4', description: 'Adds routing to React'},
            {title: 'React Saga', description: 'Facilitates server side rendering and data fetching'},
            {title: 'Hapi', description: 'A node server framework.'},
            {title: 'Babel', description: ''},
            {title: 'TypeScript', description: ''}
        ]
        return (
          <React.Fragment>
	          <link href="/assets/styles/about.css" rel="stylesheet"/>
              <section className={styles['about-section']}>
                  <h1>О проекте</h1>
                  <h3>Среда для эффективной разработки Front-End приложений</h3>
                  <div className='about-grid'>
                      {libs.map(({title, description}) => <article key={title}>
                          <h4>{title}</h4>
                          <p>{description}</p>
                      </article>)}
                  </div>
              </section>
          </React.Fragment>
        );
    }
}

export default smartImport({
    module: connect<IStateToProps, IDispatchToProps, IProps>(mapStateToProps, mapDispatchToProps)(About),
    moduleName: 'About'
})

