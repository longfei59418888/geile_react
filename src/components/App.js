import React from 'react';
import appStyle from './app.module.css';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import { connect } from 'react-redux';


class AppComponent extends React.Component {

  render() {
    return (
      <div className={appStyle.box}>
        <CSSTransitionGroup
          transitionName={this.props.setSlideDirection.slideDirection}
          component="div"
          transitionEnterTimeout={this.props.setSlideDirection.time?10:500}
          transitionLeaveTimeout={this.props.setSlideDirection.time?10:300}>
          <div key={this.props.location.pathname}
               style={{position:"absolute", width: "100%",height:'100%',backgroundColor:'#fff'}}>
            {this.props.children}
          </div>
        </CSSTransitionGroup>
      </div>

    );
  }
  componentDidMount(){
    document.addEventListener('touchmove',function (e) {
      e.preventDefault();
    })
    document.addEventListener('mousemove',function (e) {
      e.preventDefault();
    })
  }
}
AppComponent.defaultProps = {
};

function bindDate(state) {
  return state
}
export default connect(bindDate)(AppComponent);


