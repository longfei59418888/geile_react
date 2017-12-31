// Default export. Please add your own components you want to export here!
import YeomanImage from './components/YeomanImage';

export { YeomanImage };
export default {
  YeomanImage
};

/*
import React, { Component } from 'react';
import {HashRouter as Router, Route,} from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group' // ES6
class App extends Component {
  render() {
    return (
        <Router>
            <Route render={({ location }) => {
                  return(
                      <div className="box">
                       <CSSTransitionGroup
                        transitionName="left"
                          component="div"
                          transitionEnter={true}
                          transitionLeave={true}
                          transitionEnterTimeout={400}
                          transitionLeaveTimeout={400}>
                          <div key={location.pathname}
                          style={{position:"absolute", width: "100%",height:'100%',backgroundColor:'#fff'}}>
                           <Route  exact path="/about" render={({location})=>(<h1>{`${location.pathname}about`}</h1>)}></Route>
                           <Route  exact path="/search" render={()=>(<h1>search</h1>)}></Route>
                          </div>
                      </CSSTransitionGroup>
                    </div>
                  )
              }}/>
        </Router>
    );
  }
}

class About extends Component{
    previousLocation = this.props.location
    componentWillUpdate(nextProps){
        const { location,history } = this.props
        if (history.action !== 'POP' && (!location.state || !location.state.modal)) {
            this.previousLocation = this.props.location
        }
    }
    render(){
        const { match,location } = this.props
        const isModal = !!(
            location.state &&
            location.state.modal &&
            this.previousLocation !== location // not initial render
        )
        return (
            <div className="slide-box" style={{transform:isModal?'translateX(-100%)':'translateX(0)'}}>
                <Switch location={isModal ? this.previousLocation : location}>
                    <Route  exact path={`${match.url}/1`} render={()=>(<Link
                        to={{pathname:`${match.url}/modal`,
                        state: { modal: true }}
                    }>1</Link>)}></Route>
                    <Route  exact path={`${match.url}/2`} render={()=>(<h1>2</h1>)}></Route>
                </Switch>
                <div className="slide-box-left">
                   <Route render={()=>(
                        <div >img</div>
                    )} />
                </div>
            </div>
        )
    }
}



export default App;
// .box{position: absolute;width: 100%;height: 100%;text-align: center;overflow: hidden;}
// /*路由切换动画——左移动*/
// .left-enter {  position: absolute;  top: 0;
//     background: #fff;  z-index: 10000;  opacity: 1;  transform: translateX(100%);  }
// .left-enter.left-enter-active {  opacity: 1;  transform: translateX(0);  transition: all 0.4s ease-out;  }
// .left-leave {  opacity: 1;  transform: translateX(0);  }
// .left-leave.left-leave-active {  opacity: 1;  transform: translateX(-50%);  transition: all 0.4s ease-out;  }
// /*路由切换动画——右移动*/
// .right-enter {  transform: translateX(-100%); z-index: 99999;  }
// .right-enter.right-enter-active {  transform: translateX(0);  transition: all 0.4s ease-out;  }
// .right-leave {  position: absolute;  top: 0;  background: #fff;  z-index: 10000;  opacity: 1;  transform: translateX(0);  }
// .right-leave.right-enter-active {  transform: translateX(-50%);  transition: all 0.4s ease-out;  }

*/
