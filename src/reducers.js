import getInitialState from './Init'

export const initialState = getInitialState()

/*
** Common state which for now is being used to get the focussed position of the board
** so that if user hits number button, corresponding number can be filled there
*/
export const commonState = function(state={focussedEl : null},action){
    switch(action.type){
        case 'SET_FOCUSSED_ELEMENT':
            return Object.assign({},{focussedEl : action.focussedEl})
        default:
            return state;
    }
}


// Main sudoku board state contains board array
export function sudokuReducer(state=initialState,action){

    switch(action.type){
        case 'SETCOMBINATION':
            const nextState = state.concat();
            nextState[parseInt(action.moveRow,10)][parseInt(action.moveColumn,10)] = parseInt(action.moveValue,10);
            return nextState;

        case 'SET_BOARD_DATA':
            return action.boardData.concat();

        case 'CLEAR_BOARD_DATA':
            const init = getInitialState()
            return init.concat();
        
        default:
            return state;
    }
}

// This is to control snackbar behavior 
export function snackBarReducer(state={showSnackbar:false,snackMessage:"Succes"},action){
    switch(action.type){
        case 'SHOW_SNACKBAR':
        return Object.assign({},{
            showSnackbar: true,
            snackMessage : action.message
        })

        case 'HIDE_SNACKBAR': 
        return Object.assign({},{
            showSnackbar: false,
            snackMessage : ''
        })

        default:
            return state
    }
}

// This is to control loader behavior
export function loaderReducer(state={showLoader:false},action){
    switch(action.type){
        case 'SHOW_LOADER': 
        return Object.assign({},{
            showLoader: true
        })

        case 'HIDE_LOADER': 
        return Object.assign({},{
            showLoader: false
        })

        default:
            return state
    }
}

/*
** This is to control error behavior after calling api, based on the values here
** appropriate board element will show error(in red)
*/
export function sudokuErrorReducer(state={col:-1,row:-1},action){
    switch(action.type){
        case 'SET_ERROR':
            return Object.assign({},{row:action.row,col:action.col})
        case 'CLEAR_ERROR':
            return Object.assign({},{row:-1,col:-1})
        default:
            return state;
    }
}

// export default rootReducer;