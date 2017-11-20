import axios from 'axios'
export const GET_STORE_LIST = 'GET_STORE_LIST';
import URL_CONFIG from './url_config'
/*
* isRefresh
* params
* */


export function setStoreList(query) {
  return (dispatch)=>{
    window.ajaxJsonp({
      url: 'https://api.map.baidu.com/geocoder/v2/',  // 请求地址
      jsonp: 'jsonpCallback', // 采用jsonp请求，且回调函数名为"jsonpCallbak"，可以设置为合法的字符串
      data: {address: query.area,city:query.city,output:'json',ak:GLOBAL_CONFIG.baiduAk.ak},  // 传输数据
      success:function(res){  // 请求成功的回调函数
        console.log(res);
        dispatch({
          type:GET_STORE_LIST,
          text:''
        })
      },
      error: function(error) {}  // 请求失败的回调函数
    })


  }

}




















