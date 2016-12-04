import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore,applyMiddleware,combineReducers } from 'redux'
import { sudokuReducer,snackBarReducer,loaderReducer,sudokuErrorReducer,commonState} from './Reducers'
import getInitData from './Inittest';

const rootReducer = combineReducers({
  sudokuData : sudokuReducer,
  snackBarData : snackBarReducer,
  loaderData : loaderReducer,
  sudokuErrorData : sudokuErrorReducer,
  commonState
})

let store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
)

describe('Sudoku UI', () => {
  it('renders without crashing', () => {
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  });
})

describe('Sudoku reducer', () => {
  const initData = getInitData()
  
  it('sets the initial board state', () => {
      expect(
        sudokuReducer(undefined,{})
      )
      .toEqual(initData)
  });

  it('sets the correct combination on firing SETCOMBINATION action', () => {
    const moveRow=0,moveColumn=0,moveValue=7;
    let changedData = [[7,0,1,3,8,0,2,0,0],[5,0,0,0,9,4,1,0,0],[3,6,0,0,0,2,0,4,5],[0,0,0,0,0,0,0,7,8],[0,1,0,0,0,0,0,9,0],[8,5,0,0,0,0,0,0,0],[9,2,0,1,0,0,0,3,4],[0,0,5,8,3,0,0,0,2],[0,0,3,0,2,6,7,0,0]]
    
    expect(
      sudokuReducer([[0,0,1,3,8,0,2,0,0],[5,0,0,0,9,4,1,0,0],[3,6,0,0,0,2,0,4,5],[0,0,0,0,0,0,0,7,8],[0,1,0,0,0,0,0,9,0],[8,5,0,0,0,0,0,0,0],[9,2,0,1,0,0,0,3,4],[0,0,5,8,3,0,0,0,2],[0,0,3,0,2,6,7,0,0]],{
        type: 'SETCOMBINATION',
        moveRow,moveColumn,moveValue
      })
    )
    .toEqual(changedData)

  })

})