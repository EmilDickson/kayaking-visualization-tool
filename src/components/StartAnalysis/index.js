import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "recompose";

import { withAuthorization } from "../Session";
import Loading from '../Loading';
import ViewSwitcher from "../ViewSwitcher";
import RadarChartView from './RadarChartView';
import LineChartView from './LineChartView';
import SideMenu from './SideMenu';

class StartAnalysis extends Component {
    render() {
        const { selectedView, dataInitialized } = this.props;
        if (dataInitialized) {
            return(
                <div className="rightDataManagementContainer">
                    {selectedView === "primary" ? (
                        <RadarChartView />
                    ) : (
                        <LineChartView />
                    )}
                    <ViewSwitcher 
                        primary="RadarChartView"
                        secondary="SpanLineChart"
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
    selectedView: state.logicState.selectedView,
    dataInitialized: state.dataState.dataInitialized,
})

const mapDispatchToProps = dispatch => ({
    switchSelectedView: () => dispatch({ type: "SWITCH_SELECTED_VIEW" }),
});

const condition = (authUser) => !!authUser;

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthorization(condition)
)(StartAnalysis)