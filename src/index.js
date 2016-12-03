import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import thunkMiddleware from 'redux-thunk'
import { createStore,applyMiddleware,combineReducers,compose } from 'redux'
import { sudokuReducer,snackBarReducer,loaderReducer,sudokuErrorReducer } from './reducers'
import undoable from 'redux-undo';
import { ignoreActions } from 'redux-ignore';

import App from './App';

import { Provider } from 'react-redux'

import injectTapEventPlugin from 'react-tap-event-plugin';

const rootReducer = combineReducers({
  sudokuData : undoable(sudokuReducer),
  snackBarData : ignoreActions(undoable(snackBarReducer)),
  loaderData : ignoreActions(undoable(loaderReducer)),
  sudokuErrorData : undoable(sudokuErrorReducer)
})

injectTapEventPlugin();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunkMiddleware))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)