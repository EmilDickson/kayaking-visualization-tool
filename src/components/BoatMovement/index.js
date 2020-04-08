import React, { Component } from 'react';
import { connect } from 'react-redux';

import BoatView from './BoatView';
import BubbleChart from './BubbleChart';
import Loading from '../Loading';
import BoatRoute from '../BoatRoute';
import ViewSwitcher from '../ViewSwitcher';

class BoatMovement extends Component {
    render() {
        const { dataInitialized, selectedView } = this.props;
        if (dataInitialized) {
            return(
                <div className="rightRouteWithSwitcherContainer" id="boatMovementContainer">
                    {selectedView === "primary" ? (
                        <BoatView />
                    ) : (
                        <BubbleChart />
                    )}
                    <ViewSwitcher
                        primary="BoatView"
                        secondary="BubbleChart"
                        selected={selectedView}
                        handleViewSwitch={() => this.props.switchSelectedView()}
                    />
                    <BoatRoute withRouteHighLight={false} />
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

export default connect(mapStateToProps,mapDispatchToProps)(BoatMovement)