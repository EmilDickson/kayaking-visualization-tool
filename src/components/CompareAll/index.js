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
    constructor(props) {
        super(props)

        this.state = {
            selectedView: "ParCoords",
        }
    }

    handleViewSwitch = (e) => {
        this.setState({
            selectedView: e.target.parentNode.id
        })
    }

    render() {
        if (this.props.data) {
            return (
                <div className="compareAllContainer">
                    <div className="visTimeline">
                        {this.state.selectedView === "ParCoords" ? <ParCoords /> : <SpanChart />}
                        <Timeline />
                    </div>
                    <ViewSwitcher view1="ParCoords" view2="SpanChart" selected={this.state.selectedView} handleViewSwitch={this.handleViewSwitch} />
                    <BoatRoute />
                </div>
            );
        } else {
            return <Loading />;
        }
    }
}

const mapStateToProps = state => ({
    data: state.dataState.data
});

export default compose(
    withFirebase,
    connect(mapStateToProps)
)(CompareAll);
