import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions  from '../../reducers/actions/store'
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import industry from '../../config/industry.json'
import style from './index.module.scss'
import CHead  from '../common/header'
import image1 from '../../images/icon/bellNoShadow.png'
import StoreNavList from './StoreNavList'
import StoreNavDis from './StoreNavDis'
import StoreNavSort from './StoreNavSort'
import StoreItem from './storeItem'


class AppComponent extends React.Component {
  constructor(props){
    super(props)
    const {tag,sub} = this.props.params;
    let tagId = 0
    industry.forEach((item,i)=>{
      if(item.name == tag) tagId = item.id
    })
    this.postion = {"cityId" : "77", "city" : "深圳市",
      "address" : "广东省深圳市南山区高新南一道9-南门",
      "latitude" : "22.543544", "longitude" : "113.959062",
      "streetName" : "高新9道",}
    this.state={
      index:0, nav:[], showNav: false, //下拉选择
      cityId:77, districtId:0, districtName:0,  //城市和地区ID
      tagId:tagId, tagName:tag, subId:0, subName:sub,  //分类和子分类id/名称
      sortId:0, sortName:'智能排序',  //排序方式
      storeList:[], pageIndex:1
    }
    this.isLoaded=false
  }
  componentWillMount(){
    this.props.setStoreList({
      area:'福田区',
      city:'深圳市'
    })
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
      <div className={style['store-box']}>
        <ReactIScroll iScroll={iScroll} className="example"
                      handleRefresh={this.handleRefresh.bind(this)}>
          <section>
            <StoreItem/>
          </section>
        </ReactIScroll>
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

  getDate(){

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
  //选择分类
  setTagSub(tag,tagName,sub,subName,e){
    this.setState({nav:[],index:0,tagId:tag,tagName:tagName,subId:sub,subName:subName})
  }
  //选择城市
  choseCity(id,name,e){
    this.setState({nav:[],index:0,districtId:id,districtName:name})
  }
  //排序
  chooseSort(id,name,e){
    this.setState({nav:[],index:0,sortId:id})
  }
  handleRefresh(){}
  goMessage(){
    alert('message')
  }
}



function bindDate(state) {
    return state
}
function bindOption(dispatch) {
  return bindActionCreators(actions,dispatch);
}
export default connect(bindDate,bindOption)(AppComponent);

