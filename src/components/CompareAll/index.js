import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import BoatRoute from "../BoatRoute";
import ParCoords from "../ParCoords";
import Loading from "../Loading";
import Timeline from "../Timeline";
import ViewSwitcher from "../ViewSwitcher";
import SpanChart from "../SpanChart";

class CompareAll extends Component {
    render() {
        if (this.props.data) {
            const { selectedView } = this.props;
            return (
                <div className="rightRouteWithSwitcherContainer">
                    <div className="visTimeline">
                        {selectedView === "primary" ? (
                            <ParCoords />
                        ) : (
                            <SpanChart />
                        )}
                        <Timeline withSpan={true} withPlayButtons={true} />
                    </div>
                    <ViewSwitcher
                        primary="ParCoords"
                        secondary="SpanChart"
                        selected={selectedView}
                        handleViewSwitch={() => this.props.switchSelectedView()}
                    />
                    <BoatRoute withRouteHighlight={true} />
                </div>
            );
        } else {
            return <Loading />;
        }
    }
}

const mapStateToProps = state => ({
    data: state.dataState.data,
    selectedView: state.logicState.selectedView
});

const mapDispatchToProps = dispatch => ({
    switchSelectedView: () => dispatch({ type: "SWITCH_SELECTED_VIEW" })
});

export default compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(CompareAll);
