import React from 'react';
import {connect} from 'react-redux';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';
import { CSSTransitionGroup } from 'react-transition-group' // ES6

import style from './index.module.scss'
import CHead  from '../common/header'
import image1 from '../../images/icon/bellNoShadow.png'
import StoreNavList from './StoreNavList'
import StoreNavDis from './StoreNavDis'
import StoreNavSort from './StoreNavSort'

// <ReactIScroll iScroll={iScroll} className="example"
// handleRefresh={this.handleRefresh.bind(this)}>
// </ReactIScroll>
class AppComponent extends React.Component {
    constructor(props){
      super(props)
      this.state={
        index:0, nav:[], showNav: false, //下拉选择
        cityId:77, districtId:0, districtName:0,  //城市和地区ID
        tagId:101, tagName:'美食', subId:0, subName:0,  //分类和子分类id/名称
        sortId:0, sortName:'智能排序',  //排序方式
      }
    }
    render() {
      const NavList = this.state.nav.map((item,i)=> (<div key={i}>{item}</div>))
      return (<div>
        <CHead left='back'
              right={(<div onClick={this.goMessage} className="flex-mixin-center" style={{height:'100%',left:'100%'}}>
                <img style={{height:'.48rem',width:'.48rem'}} src={image1} alt=""/>
              </div>)}>
          <div className={style['search-box']}>
            <p><i></i>输入商家名称</p>
          </div>
        </CHead>
        <ul className={style.nav}>
          <li onClick={this.showNavList.bind(this,1)} className="flex-mixin-center"><span>
            {this.state.subId==0?this.state.tagName:this.state.subName}</span><i></i></li>
          <li onClick={this.showNavList.bind(this,2)} className="flex-mixin-center"><span>
            {this.state.districtId==0?'附近地区':this.state.districtName}</span><i></i></li>
          <li onClick={this.showNavList.bind(this,3)} className="flex-mixin-center"><span>
            {this.state.sortName}
          </span><i></i></li>
        </ul>
        <div className={style.bg} style={{display:this.state.showNav?'block':'none'}}>
          <div className={style.box}>
            <CSSTransitionGroup
              transitionName='show_store'
              component="div"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={1}>
              {NavList}
            </CSSTransitionGroup>
          </div>
        </div>
      </div>);
    }
  showNavList(index,e){
      let nav = []
    if(!this.state.showNav){
      this.setState({showNav:true})
    }
    if(this.state.index != index){
      this.setState({nav:[]})
      switch (index){
        case 1:nav = [(<StoreNavList setTagSub={this.setTagSub.bind(this)}
                                     index={this.state.tagId}
                                     subIndex={this.state.subId}></StoreNavList>)];break;
        case 2:nav = [(<StoreNavDis city={this.state.cityId}
                                    choseCity={this.choseCity.bind(this)}
                                    index={this.state.districtId} ></StoreNavDis>)];break;
        case 3:nav = [(<StoreNavSort index={this.state.sortId}
                                     choseSort={this.chooseSort.bind(this)}></StoreNavSort>)];break;
        default:break;
      }
      setTimeout(()=>this.setState({nav:nav,index:index}),20)
      return
    }
    this.setState({nav:[],index:0,showNav:false})
  }
  setTagSub(tag,tagName,sub,subName,e){
    this.setState({nav:[],index:0,tagId:tag,tagName:tagName,subId:sub,subName:subName})
  }
  choseCity(id,name,e){
    this.setState({nav:[],index:0,districtId:id,districtName:name})
  }
  chooseSort(id,name,e){
    this.setState({nav:[],index:0,sortId:id})
  }

  goMessage(){
    alert('message')
  }
}



function bindDate(state) {
    return state
}
export default connect(bindDate)(AppComponent);

