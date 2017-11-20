import React from 'react';
import appStyle from '../app.module.css';
import Link from '../libs/Alink'
class AppComponent extends React.Component {

  render() {
    return (
      <div className={appStyle.box}><a href="#/page2">page2</a>
        <Link to="#/page2">test</Link></div>
    );
  }
}
AppComponent.defaultProps = {
};

export default AppComponent;
