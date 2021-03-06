/**
 * Created by admin on 2016/7/15.
 */
import * as  actions  from './actions/store'
function storeList(state={
  list:[],index:0,pageSize:10,location:'',tags:'',sortby:'',city:'',level:'',sub:'',isEnd:false,y:0
},action) {
        switch (action.type){
          case "SET_STORE_LIST_COMMON":
            return Object.assign({},state,action.data)
          case actions.SET_STORE_LIST_POSITION:
              return Object.assign({},state,action.data)
          case actions.SET_STORE_LIST:
            let list = action.data.index == 1?[]:state.list
            list = list.concat(action.data.list);
          return Object.assign({},state,action.data,{list:list})
          default :
              return state;
        }
}
export default  {
  storeList
}
