import React from 'react';
import appStyle from '../app.module.css';
import { connect } from 'react-redux';
class AppComponent extends React.Component {
  render() {
    return (
      <div  className={appStyle.box}  style={{backgroundColor:'#ccc'}}><span onClick={this.goBack.bind(this)} >page1</span></div>
    );
  }
  goBack(){
    this.props.router.back()
  }
}
AppComponent.defaultProps = {
};

function bindDate(state) {
  return state
}
export default connect(bindDate)(AppComponent);
