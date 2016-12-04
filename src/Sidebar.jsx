import React, { Component } from 'react'
import { connect } from 'react-redux'
import verifyCombinations from './api'

class Sidebar extends Component{
    constructor(props){
        super(props)
        this.sudokuData = props.sudokuData;
        this.state = {
            showTimer: false,
            duration : '0 hrs 0 mins 0 secs ',
            timerOn : false
        }
    }

    componentWillReceiveProps(props){
        this.sudokuData = props.sudokuData;
    }

    render(){
        return(
            <div className="sidebar">
                <div className="app-title"><h1>Sudoku</h1></div>
                <ul className="sukoku-numbers-list">
                    {this.getNumbersComponent()}
                </ul>
                {this.state.showTimer ? <div className="timer">{this.state.duration}</div> : ''}
                <div className="btn-container">
                    <button className="btn red" onClick={this.startStopTimer.bind(this)}>{this.state.timerOn ? 'Stop Timer':'Start Timer' }</button>
                    <button className="btn" onClick={this.clearBoardData.bind(this)}>Clear board</button>
                </div>
            </div>
        )
    }

    startStopTimer(){
        let duration;
        if(!this.state.showTimer){
            this.setState({
                showTimer: true
            })
        }
        if(this.timerId){
            clearInterval(this.timerId)
            this.timerId = null;
            this.setState({timerOn:false})
            return;
        }
        this.start = Date.now()
        this.timerId = setInterval(()=>{
            duration = (Date.now() - this.start)
            duration = this.getMinutesAndHours(duration)
            this.setState({ duration: `${duration.hours} hrs ${duration.numminutes} mins ${duration.numseconds} secs` })
        },1000)
        this.setState({timerOn:true})
    }

    getMinutesAndHours(milliseconds){
            let numseconds = Math.floor(milliseconds/1000)
            let numminutes = Math.floor(numseconds/60)
            let hours = Math.floor(numminutes/60);
            if(numminutes > 60 ){
                numminutes %= 60
            }
            if(numseconds > 60 ){
                numseconds %= 60
            }
            return{hours,numminutes,numseconds}
    }

    getNumbersComponent(){
        const arr = [1,2,3,4,5,6,7,8,9]
        return arr.map((el)=>{
            return(
                <li key={el} className="sudoku-numbers" data-value={el}
                onClick={this.handleNumberClick.bind(this)}>
                {el}
                </li>
            );
        })
    }
    
    /* 
    ** Get the active element from commonState and set the number on it
    ** in case there is no active element show snack message
    */
    handleNumberClick(event){
        const focussedEl = this.props.commonState.focussedEl
        const el = event.target;
        if(focussedEl && el){
            const value = el.getAttribute('data-value')
            const colIndex = focussedEl.getAttribute('data-colindex')
            const rowIndex = focussedEl.getAttribute('data-rowindex')
            const nextData = this.getChangedSudokuData(rowIndex,colIndex,value)
            focussedEl.value = value;
            this.props.handleNumberClick(nextData,rowIndex,colIndex,value) // dispatch api calls and other actions
        }
        else {
            this.props.showMessage('You would need to select a block then click on number')
        }
    }
    
    /* 
    ** Helper function to udate the state locally, before api finishes so that number is shown
    ** we set the updated state after the api finishes and show error if any
    */
    getChangedSudokuData(rowIndex,colIndex,value){
        this.sudokuData[parseInt(rowIndex,10)][parseInt(colIndex,10)] = parseInt(value,10);
        return this.sudokuData;
    }

    clearBoardData(){
        this.props.clearBoardData()
    }
}

const mapStoreToProps = (store) => {
    return {
        commonState : store.commonState,
        sudokuData : store.sudokuData
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleNumberClick(sudokuData, moveRow=0,moveColumn=0,moveValue=0){
        dispatch({type: 'SHOW_LOADER'})
        dispatch(verifyCombinations(sudokuData, moveRow,moveColumn,moveValue))
        .then(()=>{
            dispatch({type: 'HIDE_LOADER'})
        })
        .catch(()=>{
            dispatch({type: 'HIDE_LOADER'})
        });
        
        dispatch({type: 'SETCOMBINATION',moveRow,moveColumn,moveValue})
    },

    showMessage(message){
        dispatch({type:'SHOW_SNACKBAR',message})
    },

    clearBoardData(message){
        dispatch({type:'CLEAR_BOARD_DATA'})
    }
  }
}

export default connect(mapStoreToProps,mapDispatchToProps)(Sidebar);