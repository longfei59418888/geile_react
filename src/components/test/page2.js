import React from 'react';
import appStyle from '../app.module.css';
import { connect } from 'react-redux';
import Scroller from '../../lib/Scroller'
class AppComponent extends React.Component {
  render() {
    return (
      <div  className={appStyle.box}  style={{backgroundColor:'#ccc'}}>
        <Scroller>
            <div style={{lineHeight:'40px'}}>asdfas</div>
            <div style={{lineHeight:'40px'}}>asdfas</div>
            <div style={{lineHeight:'40px'}}>asdfas</div>
            <div style={{lineHeight:'20px'}}>asdfas</div>
            <div style={{lineHeight:'50px'}}>asdfas</div>
            <div style={{lineHeight:'50px'}}>asdf</div>
            <div style={{lineHeight:'50px'}}>asdfas</div>
            <div style={{lineHeight:'50px'}}>asdasdfasdffas</div>
            <div style={{lineHeight:'50px'}}>asdfas</div>
            <div style={{lineHeight:'40px'}}>asdfas</div>
            <div style={{lineHeight:'40px'}}>asdfas</div>
            <div style={{lineHeight:'40px'}}>asdffasdfasas</div>
            <div style={{lineHeight:'20px'}}>asdfas</div>
            <div style={{lineHeight:'20px'}}>asdfasdf</div>
            <div style={{lineHeight:'40px'}}>asdfas</div>
            <div style={{lineHeight:'40px'}}>sdfdfas</div>
            <div style={{lineHeight:'40px'}}>asdfas</div>
            <div style={{lineHeight:'40px'}}>asdfasd</div>
        </Scroller>
      </div>
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
