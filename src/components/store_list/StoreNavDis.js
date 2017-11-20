import React from 'react';
import {connect} from 'react-redux';
import style from './index.module.scss'
import city from '../../config/city.json'

let cityFormate = []
city.list.forEach((item,i)=>{
  if(!cityFormate[item.parentAreaId]){
    cityFormate[item.parentAreaId]=[item]
  }else {
    cityFormate[item.parentAreaId].push(item)
  }
})

class AppComponent extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const cityId = this.props.city?this.props.city:77
    const areaId = this.props.index?this.props.index:0
    const city = cityFormate[cityId]
    return (<div className={style['city-list']}>
      <aside style={{width:'100%'}}>
        <p className={areaId == 0?style.active:''} onClick={this.choose.bind(this,0)}><i></i><span>全部</span></p>
        {city.map((item,i)=>(<p className={areaId == item.areaId?style.active:''}
                                onClick={this.choose.bind(this,item.areaId,item.pickerViewText)} key={i}><i></i><span>{item.pickerViewText}</span></p>))}
      </aside>
    </div>)
  }
  choose(id,name,e){
   this.props.choseCity(id,name)
  }
}
AppComponent.defaultProps = {};

export default AppComponent

