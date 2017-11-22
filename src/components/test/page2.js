import React from 'react';
import appStyle from '../app.module.css';
import { connect } from 'react-redux';
import Scroller from '../../lib/Scroller'
class AppComponent extends React.Component {
  constructor(props){
    super(props)
    this.state={
      list:[1,23,45,3442,342,3,4]
    }
  }
  render() {
    return (
      <div  className={appStyle.box}  style={{backgroundColor:'#ccc'}}>
        <Scroller>
           <div>
             {this.state.list.map((item,i)=>( <div key={i} style={{lineHeight:'40px'}}>asdfas{item}</div>))}
           </div>
        </Scroller>
      </div>
    );
  }
  onRefresh(scroll,bak,e){

    var _this = this;
    setTimeout(()=>{
      _this.setState({list:this.state.list.concat([12,234,2,34,23,42,34,23,42,342,3,4,42,34,'end'])})
      bak(true)
    },2000)
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
