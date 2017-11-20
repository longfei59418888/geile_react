import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux'
import initStore from './stores/index'
import global_config from './config'

require('./styles/common.scss')



//  页面切换
hashHistory.SLIDE_ING = false
function setSlideStatus(action,bak) {
  if(hashHistory.SLIDE_ING) return
  hashHistory.SLIDE_ING = true
  initStore.dispatch({type:action,text:''})
  bak()
  setTimeout(function () {
    hashHistory.SLIDE_ING = false
    initStore.dispatch({type:'NO_FORWARD_BACK',text:''})
  },500)
}
hashHistory.goTo = function(count) {
  setSlideStatus('LEFT_FORWARD',function () {
    hashHistory.go(count)
  })
};
hashHistory.goReplace = function(location) {
  setSlideStatus('LEFT_FORWARD',function () {
    hashHistory.replace(location)
  })
};
hashHistory.back = function(count) {
  setSlideStatus('RIGHT_BACK',function () {
    hashHistory.goBack(count)
  })
};
hashHistory.backReplace = function(location) {
  setSlideStatus('RIGHT_BACK',function () {
    hashHistory.replace(location)
  })
};
initStore.dispatch({type:'NO_FORWARD_BACK',text:''})


//路由变化
hashHistory.listenBefore(function () {

})
//默认无动效，Alink组件实现左滑，back实现右滑动

import App from './components/App';
import Home from './components/Home';
import StoreList from './components/store_list'
import Page2 from './components/test/page2'


ReactDOM.render(
  <AppContainer>
    <Provider store={initStore}>
      <Router history={hashHistory} >
        <Route path="/" component={App}>
          <Route path="store_list/:tag/:sub" component={StoreList} />
          <Route path="page2" component={Page2} />
          <Route path="/home" component={Home} />
        </Route>
      </Router>
    </Provider>
  </AppContainer>,
  document.getElementById('app'));
// if (module.hot) {
//   module.hot.accept('./components/App', () => {
//     const NextApp = require('./components/App').default; // eslint-disable-line global-require
//     ReactDOM.render(
//       <AppContainer>
//         <Provider store={initStore}>
//           <Router history={hashHistory} >
//             <Route path="/" component={NextApp}>
//               <Route path="page1" component={YeomanImage} />
//               <Route path="page2" component={YeomanImage} />
//             </Route>
//           </Router>
//         </Provider>
//       </AppContainer>,
//       document.getElementById('app')
//     );
//   });
// }

