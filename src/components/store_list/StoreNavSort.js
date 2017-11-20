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
    const index = this.props.index?this.props.index:0
    const list = [
      {id:0,name:'智能排序'},
      {id:1,name:'返豆优先'},
      {id:2,name:'附近优先'},
      {id:3,name:'人气优先'},
    ]
    return (<div className={style['city-list']}>
      <aside style={{width:'100%'}}>
        {list.map((item,i)=>(
          <p className={index == item.id?style.active:''} onClick={this.choose.bind(this,item.id,item.name)}><i></i><span>{item.name}</span></p>
        ))}
      </aside>
    </div>)
  }
  choose(id,name,e){
    this.props.choseSort(id,name)
  }
}
AppComponent.defaultProps = {};

export default AppComponent

