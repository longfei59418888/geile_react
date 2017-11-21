/**
 * Created by admin on 2016/7/15.
 */
import * as  actions  from './actions/store'
function storeList(state={
  list:[],index:0,pageSize:10,location:'',tags:'',sortby:'',city:'',level:'',sub:'',idEnd:false
},action) {
        switch (action.type){
            case actions.SET_STORE_LIST_POSITION:
                return Object.assign({},state,action.data)
          case actions.SET_STORE_LIST:
            console.log(action.data)
            let list = state.list.concat(action.data.list);
            return Object.assign({},state,action.data,{list:list})
            default :
                return state;
        }
}
export default  {
  storeList
}
