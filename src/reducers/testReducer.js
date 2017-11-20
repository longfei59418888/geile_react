/**
 * Created by admin on 2016/7/15.
 */
import * as  actions  from './actions/test'
function test(state={},action) {
        switch (action.type){
            case actions.DO_TEST:
                return Object.assign({},state,action.data)
            default :
                return state;
        }
}
export default  {
  test
}
