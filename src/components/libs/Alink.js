import React from 'react';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';
class AppComponent extends React.Component {
    render() {
        return (<a href={this.props.to} onClick={this.goTo.bind(this,event)}>{this.props.children}</a>);
    }
    goTo(s,event){
      var _this = this;

      if(this.props.replace){
        hashHistory.replace(this.props.replace)
        event.preventDefault();
      }else {
        _this.props.dispatch({type:'LEFT_FORWARD',text:''})
      }
      // 默认无动效
      setTimeout(()=>{
        this.props.dispatch({type:'NO_FORWARD_BACK',text:''})
      },50)

    }
}
AppComponent.defaultProps = {};
function bindDate(state) {
    return state
}
export default connect(bindDate)(AppComponent);

