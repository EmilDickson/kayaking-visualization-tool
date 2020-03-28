import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from '../Loading';
import ViewSwitcher from "../ViewSwitcher";
import RadarChartView from './RadarChartView';
import BarChartView from './BarChartView';
import SideMenu from './SideMenu';

class StartAnalysis extends Component {
    render() {
        const { data, dataSelection, selectedView } = this.props;
        if (data) {
            return(
                <div className="rightDataManagementContainer">
                    {selectedView === "primary" ? (
                        <RadarChartView />
                    ) : (
                        <BarChartView />
                    )}
                    <ViewSwitcher 
                        primary="RadarChartView"
                        secondary="BarChartView"
                        selected={selectedView}
                        handleViewSwitch={() => this.props.switchSelectedView()}
                    />
                    <SideMenu />
                </div>
            )
        } else {
            return <Loading />
        }
    }
}

const mapStateToProps = state => ({
    data: state.dataState.data,
    dataSelection: state.dataState.dataSelection,
    selectedView: state.logicState.selectedView,
})

const mapDispatchToProps = dispatch => ({
    switchSelectedView: () => dispatch({ type: "SWITCH_SELECTED_VIEW" })
});

export default connect(mapStateToProps, mapDispatchToProps)(StartAnalysis)