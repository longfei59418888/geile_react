import React from 'react';
import {connect} from 'react-redux';
import style from './index.module.scss'
import Star from './star'

class AppComponent extends React.Component {
    render() {
      let {images,tags,title,saleRate,shortName,paymentCount,perCapita,categoryName,areaName,distance,commentGrade} = this.props.item;
        return (<div className={style['store-item']}>
          <aside><img src={images} alt=""/></aside>
          <div>
            <header>{shortName}</header>
            <aside><Star score={commentGrade}/><p>{commentGrade}分  {paymentCount}人已消费 </p></aside>
            <p>{areaName.length>4?areaName.slice(4):areaName}·{categoryName} <span>{distance>999?(distance/1000).toFixed(2)+'k':distance}m</span></p>
          </div>
          <p><span>10%</span></p>
        </div>);
    }
}
AppComponent.defaultProps = {};

export default AppComponent

