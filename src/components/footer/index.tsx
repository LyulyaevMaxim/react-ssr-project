import * as React from 'react';
import smartImport from '~utils/smartImport'

interface IProps {
}

interface IState {
}

class Footer extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const styles = require('./footer.scss')
        return (
            <React.Fragment>
                <link href="/assets/styles/footer.css" rel="stylesheet"/>
                <footer className={styles['footer']}>
                    <p className={styles['p']}>Компонент Footer - асинхронный компонент</p>
                </footer>
            </React.Fragment>
        )
    }
}

export default smartImport({moduleName: 'footer', module: Footer})
