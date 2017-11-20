/**
 * Created by admin on 2016/7/15.
 */
import * as  actions  from './actions/store'
function storeList(state={
  list:[],index:0,pageSize:10,location:'',tags:'',sortby:'',
},action) {
        switch (action.type){
            case actions.GET_STORE_LIST:
                return Object.assign({},state,action.data)
            default :
                return state;
        }
}
export default  {
  storeList
}
