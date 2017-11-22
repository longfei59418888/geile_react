/**
 * Created by DELL on 2017/11/16.
 */
import React from 'react';
import style from './style.module.scss'
import Link from '../libs/Alink'

const Component = (props)=>(
  <div className={style.nav}>
    <ul>
      <li><Link to="#/store_list/101/0"><img src="http://image-cdn.365gl.com/life/1.png" alt=""/><p>美食</p></Link></li>
      <li><Link to="#/store_list/104/0"><img src="http://image-cdn.365gl.com/life/2.png" alt=""/><p>丽人</p></Link></li>
      <li><Link to="#/store_list/103/0"><img src="http://image-cdn.365gl.com/life/3.png" alt=""/><p>休闲娱乐</p></Link></li>
      <li><Link to="#/store_list/105/0"><img src="http://image-cdn.365gl.com/life/4.png" alt=""/><p>酒店住宿</p></Link></li>
      <li><Link to="#/store_list/107/0"><img src="http://image-cdn.365gl.com/life/5.png" alt=""/><p>运动健身</p></Link></li>
      <li><Link to="#/store_list/106/0"><img src="http://image-cdn.365gl.com/life/6.png" alt=""/><p>生活服务</p></Link></li>
      <li><Link to="#/store_list/112/0"><img src="http://image-cdn.365gl.com/life/7.png" alt=""/><p>汽车服务</p></Link></li>
      <li><Link to="#/store_list/101/0"><img src="http://image-cdn.365gl.com/life/8.png" alt=""/><p>旅游</p></Link></li>
    </ul>
  </div>
)
export default Component
