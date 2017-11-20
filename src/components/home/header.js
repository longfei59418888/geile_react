/**
 * Created by DELL on 2017/11/16.
 */
import React from 'react';
import style from './style.module.scss'
const HomeHeader = (props)=>(
  <div className={style['head-box']}>
    <div className={style['head-top']}>
      <div className={style['search-box']}>
        <p>未定位</p>
        <p><i></i>输入商家名称</p>
      </div>
      <div className={style['message']}></div>
    </div>
    <div className={style['head-info']}>
        <div className={style['head-left']}>
          <header>
            <p>16</p>
            <aside>
              <p>十一月</p>
              <p>星期四</p>
            </aside>
          </header>
          <footer>左右滑动显示余额</footer>
        </div>
        <div className={style['head-right']}>
          <i></i>
          <p>扫一扫</p>
        </div>
    </div>
  </div>
)
HomeHeader.displayName = 'HomeHeader';
export default HomeHeader
