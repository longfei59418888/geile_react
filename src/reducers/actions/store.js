import axios from 'axios'

import URL_CONFIG from './url_config'
/*
* isRefresh
* params
* */

export const SET_STORE_LIST = 'SET_STORE_LIST'; // 设置列表
export const SET_STORE_LIST_POSITION = 'SET_STORE_LIST_POSITION'; //得到城市位置
export function setStoreList(query) {
  let type = query.type
  switch (type){
    case SET_STORE_LIST_POSITION:
      return (dispatch)=>{
        let promise = new Promise((reject,resolve)=>{
          window.ajaxJsonp({
            url: 'https://api.map.baidu.com/geocoder/v2/',  // 请求地址
            jsonp: 'jsonpCallback', // 采用jsonp请求，且回调函数名为"jsonpCallbak"，可以设置为合法的字符串
            data: {address: query.area,city:query.city,output:'json',ak:GLOBAL_CONFIG.baiduAk.ak},  // 传输数据
            success:function(res){  // 请求成功的回调函数
              dispatch({
                type:SET_STORE_LIST_POSITION,
                data:{
                  location:res.result.location.lng+','+res.result.location.lat,
                  city:query.city,
                  level:res.result.level
                }
              })
              reject()
            },
            error: function(error) {}  // 请求失败的回调函数
          })
        });
        return promise
      }
      break;
    case 'SET_STORE_LIST':
      return (dispatch)=>{
        let radius = query.level=='城市'?40000:15000;
        let promise = new Promise((reject,resolve)=>{
          window.ajaxJsonp({
            url: 'https://api.map.baidu.com/geosearch/v3/nearby',
            jsonp: 'jsonpCallback',
            data: {
              location: query.location,
              page_size:10,
              page_index:query.index,
              tags:query.tags,
              radius:radius,
              q:query.sub,
              sortby:query.sortby,
              output:'json',
              ak:GLOBAL_CONFIG.baiduAk.ak,
              geotable_id:GLOBAL_CONFIG.baiduAk.id},
              success:function(res){
              dispatch({
                type:SET_STORE_LIST,
                data:{
                  index:query.index+1,
                  sortby:query.sortby,
                  sub:query.sub,
                  tags:query.tags,
                  list:res.contents
                }
              })
              reject()
            },
            error: function(error) {}  // 请求失败的回调函数
          })
        });
        return promise
      }
      break;
    default:
      break;
  }


}




















