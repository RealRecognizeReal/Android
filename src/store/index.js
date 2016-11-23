import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducer';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

export function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}
