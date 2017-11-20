import React from 'react';
import {connect} from 'react-redux';

class AppComponent extends React.Component {

    render() {

        return (<div>

        </div>);
    }
}
AppComponent.defaultProps = {};
function bindDate(state) {
    return state
}
export default connect(bindDate)(AppComponent);

