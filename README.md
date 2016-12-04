## How to run

Require latest node version. Have built it with v6.6.0 but other versions should also work.

```javascript
npm install or yarn install // in case you are using yarn
npm start // this will start dev server which is proxying to backend api
npm run test // run few basic tests using jest
```
![alt text](https://raw.githubusercontent.com/swapnilmishra/sudoku/master/screenshot/screen.gif "Demo run screenshot")

All the source code is in [src directory](https://github.com/swapnilmishra/sudoku/tree/master/src) with [index.js](https://github.com/swapnilmishra/sudoku/blob/master/src/index.js) being the entry file.

## Tools being used

* [Create react app](https://github.com/facebookincubator/create-react-app) to create boilerplate which comes with [Babel](babeljs.io) and [Webpack](https://webpack.github.io).
* [ReactJS](https://facebook.github.io/react) for View and [Redux](https://github.com/reactjs/redux) for state management.
* [Material ui loader and snackbar](www.material-ui.com) are used, rest of the CSS was handrolled.

## Initial state
Right now it uses a fixed set/state for inital data which is [predefined statically](https://github.com/swapnilmishra/sudoku/blob/master/src/Init.js) for now but can be generated randomly if required.
