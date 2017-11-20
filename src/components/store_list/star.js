import React from 'react';
import {connect} from 'react-redux';
import style from './index.module.scss'

class AppComponent extends React.Component {
    constructor(props){
      super(props)
    }
    render() {
      const score = []

      for (var i=0;i<this.props.score;i++){
        score.push((<span key={i}></span>))
      }
      return ( <div className={style.star}>
        <p><span></span><span></span><span></span><span></span><span></span></p>
        <div>
          {score.map((item,i)=>item)}
        </div>
      </div>);
    }
}
AppComponent.defaultProps = {};
export default AppComponent

