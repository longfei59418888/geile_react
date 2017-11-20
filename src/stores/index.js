/**
 * Created by admin on 2016/7/4.
 */
import {createStore, applyMiddleware} from 'redux'
import reducers from '../reducers/index'
import chunk from 'redux-thunk'
function logger(s) {
  return function (dispatch) {
    return function (action) {
      let result = dispatch(action)
      return result
    }
  }
}
// let createStoreWithMiddleware = applyMiddleware(chunk,logger)(createStore)
const initStore = createStore(reducers, applyMiddleware(chunk,logger));
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers/index', () => {
    const nextReducer = require('../reducers/index');
    initStore.replaceReducer(nextReducer);
  });
}
export default initStore;
