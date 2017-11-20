import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux'
import style from './style.module.scss'
class Component extends React.Component{
  render(){
    const current = this.props.bottom
    return(<div className='common_bottom'>
      <a href="" onClick={this.setBottomStyle.bind(this,event,'index')} className={current=='index'?'active':''}><i></i><span>首页</span></a>
      <a href="" onClick={this.setBottomStyle.bind(this,event,'store')} className={current=='store'?'active':''}><i></i><span>商家</span></a>
      <a href="" onClick={this.setBottomStyle.bind(this,event,'mine')} className={current=='mine'?'active':''}><i></i><span>我的</span></a>
    </div>)
  }
  setBottomStyle(s,text,event){
    console.log(this.props.setBottomStyle(text))
    event.preventDefault();
    return false
  }
}
// export default Component
function bindDate(state) {
  return state.globalStyleInfo
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBottomStyle: (text) => {
      dispatch({
        type:'GLOBAL_SET_BOTTOM_STYLE',
        text:text
      })
    }
  }
}
export default connect(bindDate,mapDispatchToProps)(Component);
