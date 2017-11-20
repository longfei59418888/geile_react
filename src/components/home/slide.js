/**
 * Created by DELL on 2017/11/16.
 */
import React from 'react';
import ReactSwipe from 'react-swipe';
import style from './style.module.scss'
const Component = (props)=>(
  <div className={style.slide}>
    <ReactSwipe className="carousel" swipeOptions={{continuous: true}}>
      <aside><img src="https://gl365dev.oss-cn-shenzhen.aliyuncs.com/merchant/gl_24_ads/1509087260_ads.png" alt=""/></aside>
    </ReactSwipe>
  </div>
)
function handleLeftSwipe(e) {
  console.log(e);
}
export default Component
