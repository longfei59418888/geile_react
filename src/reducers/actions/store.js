import axios from 'axios'
export const GET_STORE_LIST = 'GET_STORE_LIST';
import URL_CONFIG from './url_config'
/*
* isRefresh
* params
* */


export function setStoreList(query) {
  return (dispatch)=>{
    window.getBaiduListsCallBack=function (data) {
      console.log(data)
      dispatch({
        type:GET_STORE_LIST,
        text:''
      })
    }
    axios.get(getPostion(query.area,query.city))
  }

}
function getPostion(area,city) {
  return 'https://api.map.baidu.com/geocoder/v2/?output=json&' +
    'address='+area+'&' +  //选中区，以区位置为中心
    'city='+city+
    '&ak='+GLOBAL_CONFIG.baiduAk.ak+'&callback=getBaiduListsCallBack'
}



















