import React, { Component } from 'react';
import './App.css';
import Sudoku from './SudokuComponent'
import Loader from './loader'
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ActionCreators } from 'redux-undo';

import { connect } from 'react-redux'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      showLoader : false,
      snackOpen : false,
      snackMessage : ''
    }
  }

  componentWillReceiveProps(props){
    this.setState({
      snackOpen : props.snackBarData.showSnackbar,
      snackMessage : props.snackBarData.snackMessage,
      showLoader : props.loaderData.showLoader
    })
  }
  
  render() {
    const loaderEl = this.state.showLoader ? <MuiThemeProvider><Loader/></MuiThemeProvider> : ''
    return (
      <div className="grid grid-pad" id="gridRoot">
        <button onClick={this.props.undoState.bind(this)}>Undo</button>
        <button onClick={this.props.redoState.bind(this)}>Redo</button>
        {loaderEl}
        <MuiThemeProvider>
          <Snackbar
            open={this.state.snackOpen}
            message={this.state.snackMessage}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose.bind(this)}
          />
        </MuiThemeProvider>
        <Sudoku 
        showLoader={this.showLoader.bind(this)}
        hideLoader={this.hideLoader.bind(this)}
        showSnack={this.showSnack.bind(this)}/>
      </div>
    );
  }

  showLoader(){
    this.setState({showLoader : true})
  }

  hideLoader(compRef){
      this.setState({showLoader : false})
  }

  showSnack(snackMessage){
    this.setState({
      showSnack : true,
      snackMessage
    })
  }

  handleRequestClose(){
    this.setState({
      snackOpen: false
    })
    this.props.unsetSnackData()
  }
}

const mapStoreToProps = (store) => {
    return {
        snackBarData : store.snackBarData.present,
        loaderData : store.loaderData.present
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        unsetSnackData : () => {
          dispatch({type: 'HIDE_SNACKBAR'})
        },
        undoState : () => {
          dispatch(ActionCreators.undo())
        },
        redoState : () => {
          dispatch(ActionCreators.redo())
        }
    };
}

export default connect(mapStoreToProps,mapDispatchToProps)(App);
