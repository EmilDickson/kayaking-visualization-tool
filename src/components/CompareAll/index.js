import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import BoatRoute from "../BoatRoute";
import ParCoords from "../ParCoords";
import Loading from "../Loading";
import Timeline from "../Timeline";

class CompareAll extends Component {
    render() {
        if (this.props.data) {
            return (
                <div className="compareAllContainer">
                    <div className="visTimeline">
                        <ParCoords />
                        <Timeline />
                    </div>
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
