import React, { Component } from 'react';
import { connect } from 'react-redux';

class BarChartView extends Component {
    render() {
        return(
            <div>
                POOOF!
            </div>
        )
    }
}

const mapStateToProps = state => ({
    dataSelection: state.dataState.dataSelection,
})

export default connect(mapStateToProps)(BarChartView);