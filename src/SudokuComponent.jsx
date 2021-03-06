import React, { Component } from 'react'
import { connect } from 'react-redux'
import verifyCombinations from './api'

class Sudoku extends Component{
    
    constructor(props){
        super(props)
        this.sudokuData = props.sudokuData;
        this.sudokuErrorData = props.sudokuErrorData;
    }

    componentWillReceiveProps(props){
        this.sudokuData = props.sudokuData;
        this.sudokuErrorData = props.sudokuErrorData;
    }
    render(){
        return(
            <div>
                {this.createComponent()}
            </div>    
        );    
    }

    //Initial state of the board is passed via props.sudokuData and the board is formed using it
    createComponent(){
        /* 
        ** Check if there was an error after we made call to api
        ** if yes set elements class as error
        */
        const {row,col} = this.sudokuErrorData;
        return (this.props.sudokuData.map( (currVal,rowIndex) =>{
            return currVal.map((val,colIndex)=>{
                let cls='col-1-9 sudoku-el';
                if(colIndex === col && rowIndex === row)
                    cls += ' error'
                return  (
                    <div className={cls}>
                        <input type="text" 
                        value={val || ''}
                        maxLength="1"
                        pattern="[0-9]"
                        data-rowindex={rowIndex} 
                        data-colindex={colIndex}
                        onChange={this.handleInputChange.bind(this)}
                        onFocus={this.handleInputFocusChange.bind(this)}
                        />
                    </div>
                );
            });
        }));
    }

    handleInputChange(event){
        const el = event.target
        let value = el.value
        /* 
        ** Handle case when user removes data from the field we set the data
        ** as 0 means no data in our case. See value={val || ''} in createComponent
        */
        if(value === '') {
            value=0
        }
        // validation
        else if(!(/[1-9]{1}/.test(value))){
            this.props.showMessage('You can only enter numbers between 1-9')
            return;
        }
        const colIndex = el.getAttribute('data-colindex')
        const rowIndex = el.getAttribute('data-rowindex')
        const nextData = this.getChangedSudokuData(rowIndex,colIndex,value)
        if(value === 0){
            this.props.setLocalData(rowIndex,colIndex,value)
            return;
        }
        this.props.handleInputChange(nextData,rowIndex,colIndex,value,this) // dispatch api calls and other actions
    }

    /* 
    ** Set the current focussed element to store
    ** so that if user hits number button, corresponding number can be filled there
    */
    handleInputFocusChange(event){
        this.props.handleInputFocusChange(event.target)
    }

    /*
    ** Helper function to udate the state locally, before api finishes so that number is shown
    ** we set the updated state after the api finishes and show error if any
    */
    getChangedSudokuData(rowIndex,colIndex,value){
        this.sudokuData[parseInt(rowIndex,10)][parseInt(colIndex,10)] = parseInt(value,10);
        return this.sudokuData;
    }
}

const mapStoreToProps = (store) => {
    return {
        sudokuData : store.sudokuData,
        sudokuErrorData : store.sudokuErrorData,
        commonState : store.commonState
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange(sudokuData, moveRow=0,moveColumn=0,moveValue=0){
        dispatch({type: 'SHOW_LOADER'})
        dispatch(verifyCombinations(sudokuData, moveRow,moveColumn,moveValue))
        .then(()=>{
            dispatch({type: 'HIDE_LOADER'})
        })
        .catch(()=>{
            dispatch({type: 'HIDE_LOADER'})
        });
    },
    setLocalData(moveRow=0,moveColumn=0,moveValue=0){
        dispatch({type: 'SETCOMBINATION',moveRow,moveColumn,moveValue})
    },
    handleInputFocusChange(el){
        dispatch({type: 'SET_FOCUSSED_ELEMENT', focussedEl: el})
    },
    showMessage(message){
        dispatch({type:'SHOW_SNACKBAR',message})
    }
  }
}

export default connect(mapStoreToProps,mapDispatchToProps)(Sudoku);