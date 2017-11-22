import React from 'react';
import {connect} from 'react-redux';
import style from './index.module.scss'
import Star from './star'
import { ellipsis, distanceFormat } from '../libs/utils'

class AppComponent extends React.Component {
    render() {
      let {images,tags,title,saleRate,shortName,paymentCount,perCapita,categoryName,areaName,distance,commentGrade} = this.props.item;
        return (<div className={style['store-item']}>
          <aside><img src={images} alt=""/></aside>
          <div>
            <header>{shortName}</header>
            <aside><Star score={commentGrade}/><p>{commentGrade}分  {paymentCount}人已消费 </p></aside>
            <p>{ellipsis(areaName,4)}·{categoryName} <span>{distanceFormat(distance)}</span></p>
          </div>
          <p><span>10%</span></p>
        </div>);
    }
}
AppComponent.defaultProps = {};

export default AppComponent

