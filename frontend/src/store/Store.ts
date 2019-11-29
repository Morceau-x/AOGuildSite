import {createStore, applyMiddleware, Store, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {reducer, State} from './Reducer';
import {rootSaga} from "./Saga";


// @ts-ignore
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
export default (): Store<State> => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducer,
        composeEnhancers(
            applyMiddleware(sagaMiddleware)
        ));
    sagaMiddleware.run(rootSaga);
    return store;
};

