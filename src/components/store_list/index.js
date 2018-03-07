import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions  from '../../reducers/actions/store'
// import iScroll from 'iscroll/build/iscroll-probe';
import Scroller from '../../lib/Scroller';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import industry from '../../config/industry.json'
import style from './index.module.scss'
import CHead  from '../common/header'
import image1 from '../../images/icon/bellNoShadow.png'
import StoreNavList from './StoreNavList'
import StoreNavDis from './StoreNavDis'
import StoreNavSort from './StoreNavSort'
import StoreItem from './storeItem'
import { hashHistory } from 'react-router';

class AppComponent extends React.Component {
  constructor(props){
    super(props)
    const {tag,sub} = this.props.params;
    let tagName = '',subName=''
    industry.forEach((item,i)=>{
      if(item.id == tag) tagName = item.name
      item.sub.forEach((it,i)=>{
        if(it.id == sub) subName = item.name
      })
    })
    this.postion = {"cityId" : "77", "city" : "深圳市",
      "address" : "广东省深圳市南山区高新南一道9-南门",
      "latitude" : "22.543544", "longitude" : "113.959062",
      "streetName" : "高新9道",}
    this.state={
      index:0, nav:[], showNav: false, //下拉选择
      cityId:77, districtId:0, districtName:0,  //城市和地区ID
      tagId:tag, tagName:tagName, subId:sub, subName:subName,  //分类和子分类id/名称
      sortId:0,sortby:'', sortName:'智能排序',  //排序方式
      storeList:[]
    }
    this.isLoaded=false
    this.doRefresh=true
  }
  componentWillMount(){
    if(this.props.storeList.list.length<1) this.setPostionDate('福田区')
    else this.setState({storeList:this.props.storeList.list})
  }
  render() {
    const NavList = this.state.nav.map((item,i)=> (<div key={i}>{item}</div>))
    const List = this.state.storeList.map((item,k)=>(<div onClick={()=>{
      hashHistory.push('/page2')
    }} key={k}><StoreItem item={item} /></div>))
    console.log(React)
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
      <div className={style['store-box']}>
        <Scroller ref="scroller" init={{x:0,y:this.props.storeList.y}} leaveBefor={(scroller)=>{
          console.log(scroller)
          React.dispatch({type:'SET_STORE_LIST_COMMON',data:{y:scroller.y}})
        }} onRefresh={this.onRefresh.bind(this)}
                  onLoadMore={this.onLoadMore.bind(this)}>
          <section>
            {List}
          </section>
        </Scroller>
      </div>
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
  componentDidUpdate(){}
  setPostionDate(district){
    let _this = this;
    this.props.setStoreList({
      type:'SET_STORE_LIST_POSITION',
      area:district,
      city:'深圳市'
    }).then(()=>{
      let {index,level,location,sortby} = _this.props.storeList
      return _this.props.setStoreList({
        type:'SET_STORE_LIST',
        location:location,
        index:0,
        tags:_this.state.tagName,
        sub:_this.state.subName,
        level:level,
        sortby:sortby,
      })
    }).then((r)=>{
      _this.setState({
        storeList:_this.props.storeList.list
      })
    })
  }
  setList(bak){
    var _this = this;
    let {isEnd,list} = _this.props.storeList;
    bak(isEnd)
    _this.setState({
      storeList:list
    })
  }
  refreshDate(bak){
    let _this = this
    let {location , level } =_this.props.storeList
    setTimeout(()=>{
      _this.props.setStoreList({
        type:'SET_STORE_LIST',
        //位置
        location:location,
        level:level,
        index:0,
        tags:_this.state.tagName,
        sub:_this.state.subName,
        sortby:_this.state.sortby,
      }).then(()=>{
        _this.setList(bak)
      })
    },50)
  }
  onRefresh(scroll,bak,e){
    var _this = this;
    _this.refreshDate(function (type) {
      bak(type)
    })
  }
  onLoadMore(scroll,bak,e){
    let _this = this
    let {location , level,index } =_this.props.storeList
    setTimeout(()=>{
      _this.props.setStoreList({
        type:'SET_STORE_LIST',
        //位置
        location:location,
        level:level,
        index:index,
        tags:_this.state.tagName,
        sub:_this.state.subName,
        sortby:_this.state.sortby,
      }).then(()=>{
        _this.setList((type)=>{
          bak(type)
        })
      })
    },50)
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
                                     indexName={this.state.tagName}
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
  //选择分类
  setTagSub(tag,tagName,sub,subName){
    var _this = this,newState = {nav:[],index:0,showNav:false}
    if(tag) Object.assign(newState,{tagId:tag,tagName:tagName,})
    this.setState(Object.assign(newState,{subId:sub?sub:'',subName:sub?subName:''}))
    this.refreshDate((type)=>{
      if(type) _this.refs.scroller.setEnd()
    })
  }
  //选择城市
  choseCity(id,name,e){
    let _this = this;
    this.setState({nav:[],index:0,districtId:id,districtName:name,showNav:false})
    if(!id) return
    setTimeout(function () {
      _this.setPostionDate(_this.state.districtName)
    },50)
  }
  //排序
  chooseSort(id,name,e){
    let sortby = '',_this= this;
    switch (id){
      case 1: sortby='saleRate:-1';break;
      case 2: sortby='distance:1';break;
      case 3: sortby='paymentCount:-1';break;
    }
    this.setState({nav:[],index:0,sortId:id,sortby:sortby,showNav:false,sortName:name})
    setTimeout(function () {
      _this.refreshDate((type)=>{
        if(type) _this.refs.scroller.setEnd()
      })
    },50)
  }
}



function bindDate(state) {
    return state
}
function bindOption(dispatch) {
  return bindActionCreators(actions,dispatch);
}
export default connect(bindDate,bindOption)(AppComponent);

