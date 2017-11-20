/**
 * Created by DELL on 2017/11/16.
 */
import React from 'react';
import style from './style.module.scss'

import Image1 from '../../images/bean_explain.png'
import Image2 from '../../images/user_direction.png'


const Component = (props)=>(
  <div className={style.info}>
    <img src={Image1} alt=""/>
    <img src={Image2} alt=""/>
  </div>
)
function handleLeftSwipe(e) {
  console.log(e);
}
export default Component
