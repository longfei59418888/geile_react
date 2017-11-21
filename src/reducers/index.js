/**
 * Created by admin on 2016/7/15.
 */
import { combineReducers } from 'redux'
import test from './testReducer'
import storeReducer from './storeReducer'

//滑动方向
function setSlideDirection(state={slideDirection:''},action) {
  switch (action.type){
    case 'LEFT_FORWARD':
      return Object.assign({},state,{slideDirection:'left',time:false})
    case 'RIGHT_BACK':
      return Object.assign({},state,{slideDirection:'right',time:false})
    case 'NO_FORWARD_BACK':
      return Object.assign({},state,{slideDirection:'',time:true})
    default :
      return Object.assign({},state,{slideDirection:''})
  }
}

//全局变量
function globalStyleInfo(state={
  bottom:'index', //tab样式
},action) {
  switch (action.type){
    case 'GLOBAL_SET_BOTTOM_STYLE':
      return Object.assign({},state,{bottom:action.text})
    default :
      return Object.assign({},state,{slideDirection:''})
  }
}


export default  combineReducers(Object.assign({setSlideDirection,globalStyleInfo},storeReducer))
