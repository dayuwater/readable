import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import { createStore, applyMiddleware, compose } from "redux";
import reducer from './reducers';
import ReduxThunk from 'redux-thunk'
import {Provider} from 'react-redux';

// const store = createStore(reducer, 
//    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}

const store =  createStore(reducer, 
    applyMiddleware(ReduxThunk, logger)
)






ReactDOM.render(
<Provider store={store}>
<BrowserRouter>
    <App />
</BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
