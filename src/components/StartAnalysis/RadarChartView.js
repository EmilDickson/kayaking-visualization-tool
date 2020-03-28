import React, { Component } from 'react';
import { connect } from 'react-redux';

class RadarChartView extends Component {
    render() {
        return(
            <div>
                SNUSET!
            </div>
        )
    }
}

const mapStateToProps = state => ({
    dataSelection: state.dataState.dataSelection,
})

export default connect(mapStateToProps)(RadarChartView);