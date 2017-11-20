import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.module.scss'
import iScroll from "iscroll/build/iscroll-probe";

class AppComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        refreshTip:0,
        moreTip:'上拉加载...',
    };
    this.refreshTipList=['下拉刷新...','松手刷新...','正在刷新...']
    this.moreTipList=['上拉加载...','松手加载...','正在加载...']
    this.isTouching = false;
    this.isReload = false;
    this.isRefreshIng = false;
    this.isGetMorIng = false;
    this.isGetMore = false;
    this.loadEnd = false
  }
    render() {
        const isHasMore = this.props.doRefresh?this.props.doRefresh:null
        return (
          <div style={{position:'absolute',top:0,width:'100%',overflow:'hidden',bottom:isHasMore?0:0}}
               onTouchStart={this.onTouchStart(this)}
               onTouchEnd={this.onTouchEnd(this)}
          >
            <div style={{position:'relative',top:isHasMore?0:0}}>
              <div ref='refresh' style={{height:60,display:isHasMore?'flex':'none',alignItems:'center', justifyContent:'center'}}>
                {this.refreshTipList[0]}</div>
              {this.props.children}
              <div ref='loadMore' style={{height:60,display:'flex',display:'-webkit-flex',alignItems:'center', justifyContent:'center'}}>
                {this.moreTipList[0]}</div>
            </div>
          </div>
        );
    }
  componentDidMount() {
    const options = {preventDefault: false, zoom: false, mouseWheel: true, probeType: 3,
      bounce: true, scrollbars: true,minScrollY:0};
    this.iScrollInstance = new iScroll(ReactDOM.findDOMNode(this), options);
    this.iScrollInstance.on('scroll', this.onScroll.bind(this));
    this.iScrollInstance.on('scrollEndStart', this.onScrollEndStart.bind(this));
    this.setRefresh()
  }
  setRefresh(){
    if(this.iScrollInstance.maxScrollY>-60 || !this.props.getMore){
      this.noMore()
    }else {
      this.hasMore()
    }
  }
  componentDidUpdate() {
    var _this = this
    this.iScrollInstance.refresh();
    setTimeout(function () {
      _this.setRefresh()
      _this.iScrollInstance.refresh();
    },100)
    return true;
  }
  doRefreshEnd(){
    var _this = this;
    this.iScrollInstance.scrollTo(0,0,300)
    this.iScrollInstance.minScrollY=0
    this.isRefreshIng = false
    setTimeout(function () {
      _this.loadEnd = false
    },200)
  }
  getMoreEnd(){
    this.isGetMorIng = false
  }
  hasMore(){
    this.loadEnd = false
    this.refs['loadMore'].style['display']='flex'
  }
  noMore(){
    this.loadEnd = true
    this.refs['loadMore'].style['display']='none'
  }
  onScrollEndStart(){
    var _this = this ;
    if(this.isReload){
      this.isRefreshIng = true
      this.isReload = false;
      this.refs.refresh.innerHTML=this.refreshTipList[2]
      this.props.doRefresh(this)
      return
    }
    if(this.isGetMore){
      this.isGetMorIng = true;
      this.isGetMore = false;
      this.refs.loadMore.innerHTML=this.moreTipList[2]
      this.props.getMore(this)
    }else {
      this.props.getMore?this.iScrollInstance.scrollTo(0,this.iScrollInstance.maxScrollY+60,300):'';
    }
  }
  onScroll() {
    if(!this.isRefreshIng && !this.isGetMorIng){
      if(this.props.doRefresh){
        if(this.iScrollInstance.y>60){
          this.isReload = true;
          this.iScrollInstance.minScrollY=60
          this.refs.refresh.innerHTML=this.refreshTipList[1]
        }else {
          this.isReload = false;
          this.iScrollInstance.minScrollY=0
          this.refs.refresh.innerHTML=this.refreshTipList[0]
        }
      }
      if(this.props.getMore && !this.loadEnd ){
        if(this.iScrollInstance.maxScrollY>this.iScrollInstance.y){
          this.isGetMore = true;
          this.refs.loadMore.innerHTML=this.moreTipList[1]
        }else {
          this.isGetMore = false;
          this.refs.loadMore.innerHTML=this.moreTipList[0]
        }
      }

    }
  }
  onTouchStart(ev) {
    this.isTouching = true;
  }

  onTouchEnd(ev) {
    this.isTouching = false;
  }
}
AppComponent.defaultProps = {};

export default AppComponent
