import fetch from 'isomorphic-fetch'

export default function verifyCombinations(sudokuBoard, moveRow=0,moveColumn=0,moveValue=0){
    return (dispatch,getState) => {
      dispatch({type:'SET_ERROR',row:-1,col:-1})
      const headers = new Headers()
      headers.append('Content-type','application/json')
      return fetch('/',{
        method: 'put',
        headers,
        body: JSON.stringify({
            sudokuBoard,
            moveRow,
            moveColumn,
            moveValue,
        })
      })
      .then((response)=>{
        return handleErrors(response,dispatch)
      })
      .then(response => response.json())
      .then((json) => {
        let message = 'Awesome, keep going you are on right track!!' 
        if(json.gameOver){
          message = 'Wohoo Congrats, you won. Go and have a beer now!!'
        }
        dispatch({
          type : 'SHOW_SNACKBAR',
          message 
        })
      })
      .catch((error)=>{})

    };
}

function handleErrors(response,dispatch){
  if(!response.ok){
    switch(response.status){
      
      case 409:
        response.json()
        .then((json)=>{
          const error = "This doesn't seem to work out. Please correct the one marked in red and try again"
          dispatch({type:'SET_ERROR',row:json.conflictRow,col:json.conflictColumn})
          dispatch({type : 'SHOW_SNACKBAR',message : error})
          throw new Error(error);
        })
        break;
      
      case 400:
        const error = 'Please check if the input you have given are correct'
        dispatch({type : 'SHOW_SNACKBAR',message : error})
        throw new Error(error)
      
      default:
        if('navigator' in window && 'onLine' in navigator && !navigator.onLine){
          dispatch({type : 'SHOW_SNACKBAR',message : "You seem to have lost network connection. Please check"})
          throw new Error("You seem to have lost network connection. Please check")
        }
        else{
          dispatch({type : 'SHOW_SNACKBAR',message : "Oops something went wrong"})
          throw new Error("Oops something went wrong");
        }
    }
  }
  return response;
  
}