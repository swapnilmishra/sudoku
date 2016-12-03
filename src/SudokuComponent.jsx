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
                {this.createComponent(this.props)}
            </div>    
        );    
    }

    createComponent(){
        console.log()
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
                        data-rowindex={rowIndex} 
                        data-colindex={colIndex}
                        onChange={this.handleInputChange.bind(this)}
                        />
                    </div>
                );
            });
        }));
    }

    handleInputChange(event){
        const el = event.target
        let value = el.value
        if(value === '') value=0;
        const colIndex = el.getAttribute('data-colindex')
        const rowIndex = el.getAttribute('data-rowindex')
        const nextData = this.getChangedSudokuData(rowIndex,colIndex,value)
        this.props.handleInputChange(nextData,rowIndex,colIndex,value,this)
    }

    getChangedSudokuData(rowIndex,colIndex,value){
        this.sudokuData[parseInt(rowIndex,10)][parseInt(colIndex,10)] = parseInt(value,10);
        return this.sudokuData;
    }
}

const mapStoreToProps = (store) => {
    return {
        sudokuData : store.sudokuData.present,
        sudokuErrorData : store.sudokuErrorData.present
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange: (sudokuData, moveRow=0,moveColumn=0,moveValue=0,ref) => {
        dispatch({type: 'SHOW_LOADER'})
        dispatch(verifyCombinations(sudokuData, moveRow,moveColumn,moveValue))
        .then(()=>{
            dispatch({type: 'HIDE_LOADER'})
        })
        .catch(()=>{
            dispatch({type: 'HIDE_LOADER'})
        });
        
        dispatch({type: 'SETCOMBINATION',moveRow,moveColumn,moveValue})
    }
  }
}

export default connect(mapStoreToProps,mapDispatchToProps)(Sudoku);