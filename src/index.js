import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createStore,applyMiddleware,combineReducers,compose } from 'redux'
import { sudokuReducer,snackBarReducer,loaderReducer,sudokuErrorReducer,commonState} from './reducers'
import { Provider } from 'react-redux'
import App from './App';

import injectTapEventPlugin from 'react-tap-event-plugin';

const rootReducer = combineReducers({
  sudokuData : sudokuReducer,
  snackBarData : snackBarReducer,
  loaderData : loaderReducer,
  sudokuErrorData : sudokuErrorReducer,
  commonState
})

// requirement for material ui
injectTapEventPlugin();

// debugging REDUX state made easy only required for dev purpose and should be removed for production build
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