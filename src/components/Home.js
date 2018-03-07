import React from 'react';
import { connect } from 'react-redux';
// import Scroller  from '../lib/Scroller'

// import iScroll from 'iscroll/build/iscroll-probe';
// import ReactIScroll from 'reactjs-iscroll';
import Scroller from '../lib/Scroller'



import Head from './home/header'
import Nav from './home/nav'
import Slide from './home/slide'
import Info from './home/info'
import Bottom from './home/bottom'

class AppComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      list:[1,6,3,2,3],
      ReactIScrollOption:{
        pullDown:false,  //是否下拉
        pullUp:false, // 是否上拉
        pullDownText:'下拉文字',
        pullUpText:'上拉文字',
        pullDownThreshold:'向下拉动加载数据临界值',
        pullUpThreshold:'向上拉动加载数据临界值',
        iScroll:'iScroll',
        handleRefresh:'回调函数',
      }
    }
  }
  render() {
    return (<div style={{backgroundColor:'#F4F4F4',height:'100%'}}>
      <Head></Head>
      <div style={{position:'absolute',width:'100%',top:'2.9rem',bottom:'.9rem'}}>
        <Scroller leaveBefor={(scroller)=>{
          console.log(scroller)
        }}>
          <Nav/>
          <Slide/>
          <Info/>
        </Scroller>
      </div>
      <Bottom/>
    </div>);
  }
  handleRefresh(downOrUp, callback){
    callback()
    return
    if(downOrUp='up') callback('上拉')
    if(downOrUp='down') callback('下拉')
    callback() // 加载完毕
  }
}
AppComponent.defaultProps = {
};
function bindDate(state) {
  return state
}
export default connect(bindDate)(AppComponent);


