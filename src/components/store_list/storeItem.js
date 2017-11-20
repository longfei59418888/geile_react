import React from 'react';
import {connect} from 'react-redux';
import style from './index.module.scss'
import Star from './star'

class AppComponent extends React.Component {
    render() {
        return (<div className={style['store-item']}>
          <aside><img src="https://gl365dev.oss-cn-shenzhen.aliyuncs.com/merchant/gl_24_agent/head1503988207.jpg" alt=""/></aside>
          <div>
            <header>完鼎科技只能有限公司</header>
            <aside><Star score={4}/><p>5分  0人已消费 </p></aside>
            <p>桃源·自动售卖机 <span>1.3km</span></p>
          </div>
          <p><span>10%</span></p>
        </div>);
    }
}
AppComponent.defaultProps = {};

export default AppComponent

