import {Store} from 'redux';

interface ISagaStore<S> extends Store<S> {
    runSaga: any;
    endSaga: any;
}

export default ISagaStore;
