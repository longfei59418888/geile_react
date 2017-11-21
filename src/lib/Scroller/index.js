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
        const isHasMore = this.props.doRefresh?this.props.doRefresh:true
        return (
          <div style={{position:'absolute',top:-60,width:'100%',overflow:'hidden',bottom:isHasMore?0:0}}>
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
    var _this = this;
    _this.iScrollInstance = new iScroll(ReactDOM.findDOMNode(_this),{});

  }
  setRefresh(){

  }
  componentDidUpdate() {

  }
  doRefreshEnd(){

  }
  getMoreEnd(){

  }
  hasMore(){

  }
  noMore(){

  }
  onScrollEndStart(){

  }
  onScroll() {

  }

}
AppComponent.defaultProps = {};

export default AppComponent
