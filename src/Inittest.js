let sudokuData =  [
    [0,0,1,3,8,0,2,0,0],
    [5,0,0,0,9,4,1,0,0],
    [3,6,0,0,0,2,0,4,5],
    [0,0,0,0,0,0,0,7,8],
    [0,1,0,0,0,0,0,9,0],
    [8,5,0,0,0,0,0,0,0],
    [9,2,0,1,0,0,0,3,4],
    [0,0,5,8,3,0,0,0,2],
    [0,0,3,0,2,6,7,0,0]
]

export default function getTestInitialState(){
    // let arr=[];
    // for(let i=0; i<9; i++){
    //     let tempArray=[];
    //     for(let i=0; i<9; i++){
    //         tempArray.push(0)
    //     }
    //     arr.push(tempArray);
    // }
    // return arr;
    return sudokuData;
}