import React from 'react';
import {connect} from 'react-redux';
import style from './index.module.scss'
import industry from '../../config/industry.json'


let industryFormate = []
industry.forEach((item,i)=> industryFormate[item.id]=item.sub)

class AppComponent extends React.Component {
    constructor(props){
      super(props)
      this.state={
        index:this.props.index,
        indexName:this.props.indexName,
        subIndex:this.props.subIndex?this.props.subIndex:0,
        subList:!this.props.index?[]:industryFormate[this.props.index],
      }
    }
    render() {
      return(<div className={style['nav-list']}>
        <aside>
          <p className={this.state.index == 0?style.active:''}
             onClick={this.setSubList.bind(this,0,'全部分类')}><span>全部分类</span><i></i></p>
          {industry.map((item,i)=>(<p key={i} className={this.state.index == item.id?style.active:''}
                                      onClick={this.setSubList.bind(this,item.id,item.name)}><span>{item.name}</span><i></i></p>))}
        </aside>
        <ul>
          <p className={this.state.subIndex == 0?style.active:''}
             onClick={this.setInst.bind(this,0,'全部')}><i></i><span>全部</span></p>
          {this.state.subList.map((item,i)=>(<p key={i} className={this.state.subIndex == item.id?style.active:''}
                                                onClick={this.setInst.bind(this,item.id,item.name)}><i></i><span>{item.name}</span></p>))}
        </ul>
      </div>)
    }
  setSubList(index,name,e){
      if(index == 0){
        this.props.setTagSub(index,name,0,0)
        return
      }
      if(this.state.index == index) return;
      this.setState({
        index:index,
        indexName:name,
        subIndex:0,
        subList:industryFormate[index]
      })
  }
  setInst(index,name,e){
    console.log(this.state.index,this.state.indexName,index,name)
    this.props.setTagSub(this.state.index,this.state.indexName,index,name)
  }
}
export default AppComponent

