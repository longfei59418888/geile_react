import React from 'react';
import {hashHistory} from 'react-router'
class AppComponent extends React.Component {
  constructor(props){
    super(props)
  }
    render() {
      let {left,right,name} = this.props
      if(left=='back'){
        left = (<span className="back"><i></i></span>)
      }
      return (<div className="common_header">
        <div className="c_left" onClick={this.back.bind(this)}>{left?left:''}</div>
        <div className="c_content">{name?(<span style={{fontSize:'.32rem',color:'#fff'}}>name</span>):this.props.children}</div>
        <div className="c_right">{right?right:''}</div>
      </div>);
    }
    back(){
      if(this.props.left == 'back'){
        hashHistory.back()
      }
    }
}
AppComponent.defaultProps = {};
export default AppComponent;

