function getInitialState(){
    let arr=[];
    for(let i=0; i<9; i++){
        let tempArray=[];
        for(let i=0; i<9; i++){
            tempArray.push(0)
        }
        arr.push(tempArray);
    }
    return arr;
}

export const initialState = getInitialState()

export function sudokuReducer(state=initialState,action){

    switch(action.type){
        case 'SETCOMBINATION':
            const nextState = state.concat([]);
            nextState[parseInt(action.moveRow,10)][parseInt(action.moveColumn,10)] = parseInt(action.moveValue,10);
            return nextState;
        
        default:
            return state;
    }
}

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