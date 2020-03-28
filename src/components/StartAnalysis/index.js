import React, { Component } from 'react';
import { connect } from 'react-redux';

class StartAnalysis extends Component {
    render() {
        return(
            <div className="rightRouteWithSwitcherContainer">
                Starts!
            </div>
        )
    }
}

const mapStateToProps = state => ({
    dataSelection: state.dataState.dataSelection,
})

export default connect(mapStateToProps)(StartAnalysis)