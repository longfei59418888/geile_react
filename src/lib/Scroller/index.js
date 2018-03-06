import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.module.scss'
import iScroll from 'iscroll/build/iscroll-probe';

class AppComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        refreshTip:0,
        moreTip:'上拉加载...',
    };
    this.onRefresh  = this.props.onRefresh?this.props.onRefresh:false
    this.onLoadMore  = this.props.onLoadMore?this.props.onLoadMore:false
    this.canRefresh = false;
    this.isRefreshIng = false;
    this.canLoadMore = false;
    this.loadMoreIng  = false;
    this.loadEnd = false
    this.doRefresh=false
  }
    render() {
      return (
        <div ref='boxScroll' style={{position:'absolute',top:this.onRefresh?-60:0,width:'100%',overflow:'hidden',bottom:0,}}>
          <div ref='box'>
            <div ref='refresh' style={{height:60,display:this.onRefresh?'flex':'none',alignItems:'center', justifyContent:'center'}}>下拉刷新...</div>
            {this.props.children}
            <div ref='loadMore' style={{height:60,display:this.onLoadMore?'flex':'none',alignItems:'center', justifyContent:'center'}}>
              正在加载...</div>
          </div>
        </div>
      );
    }
  componentDidMount() {
    var _this = this;
     _this.refs['box'].style['min-height']=(_this.refs['boxScroll'].offsetHeight+1)+'px'
    _this.iScrollInstance = new iScroll(ReactDOM.findDOMNode(_this),{
      probeType: 3,
      mouseWheel: true,
      disablePointer: true,
      disableTouch:false,
      disableMouse:false,
      hasRefresh:_this.onRefresh,
      preventDefault:false
    });
    _this.iScrollInstance.on('scrollStartEnd', ()=>{
      if(this.isRefreshIng || this.loadMoreIng) return;
      if(_this.canRefresh){
        _this.refs.refresh.innerHTML='正在刷新...'
        _this.isRefreshIng = true;
        setTimeout(()=>{
          _this.onRefresh(_this,(type)=>{
            _this.refreshEnd(type)
          })
        },100)
      }
      if(_this.canLoadMore && !_this.loadEnd){
        _this.loadMoreIng  = true;
        setTimeout(()=>{
          _this.onLoadMore(_this,(type)=>{
            _this.loadMoreEnd(type)
          })
        },100)
      }
    });
    _this.iScrollInstance.on('scroll',()=>{
      if(this.isRefreshIng || this.loadMoreIng) return;
      if(_this.onRefresh){
        if(_this.iScrollInstance.y>60 && !_this.canRefresh ){
          if(!_this.canRefresh) _this.refs.refresh.innerHTML = '松手刷新...'
          _this.canRefresh = true
        }
        if( _this.iScrollInstance.y<59 && _this.canRefresh) {
          if(_this.canRefresh) _this.refs.refresh.innerHTML = '下拉刷新...'
          _this.canRefresh = false
        }
      }
      if(_this.onLoadMore && !_this.loadEnd){
        if(_this.iScrollInstance.y<_this.iScrollInstance.maxScrollY+80 && !_this.canLoadMore) _this.canLoadMore = true;
        if(_this.iScrollInstance.y>_this.iScrollInstance.maxScrollY+80 && _this.canLoadMore) _this.canLoadMore = false;
      }
    });
    if(_this.iScrollInstance.maxScrollY==-1){
      setTimeout(function () {
        _this.init()
      },100)
    }
  }
  shouldComponentUpdate(np,ns){
    if(np.children != this.props.children) this.doRefresh = true
    return true
  }
  componentDidUpdate(){
    if(this.doRefresh) this.refresh()
    this.doRefresh = false

  }
  loadMoreEnd(type){
    var _this = this;
    _this.canLoadMore=false
    setTimeout(()=>{
      if(type) _this.setEnd()
      _this.iScrollInstance.refresh()
      _this.loadMoreIng = false;
    },100)
  }
  setEnd(){
    var _this = this;
    _this.refs.loadMore.innerHTML='加载完毕...'
    _this.loadEnd = true
  }
  refresh(){
    var _this = this;
    setTimeout(()=>{
      _this.iScrollInstance.refresh()
    },100)
  }
  refreshEnd(type){  //type true:加载完毕
    var _this = this;
    _this.refs.refresh.innerHTML='下拉刷新...'
    _this.iScrollInstance.refreshEnd()
    _this.canRefresh=false
    setTimeout(()=>{
      _this.refs.loadMore.innerHTML='正在加载...'
      _this.loadEnd = false
      if(type) _this.setEnd()
      _this.iScrollInstance.refresh()
      _this.isRefreshIng = false;
    },100)
  }
  init() {
    var _this = this;
    if(!_this.loadEnd && _this.onLoadMore){
      _this.loadMoreIng  = true;
      setTimeout(()=>{
        _this.onLoadMore(_this,(type)=>{
          _this.loadMoreEnd(type)
        })
      },100)
    }
  }
}
AppComponent.defaultProps = {};

export default AppComponent
