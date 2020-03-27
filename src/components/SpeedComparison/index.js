import React, { Component } from 'react';
import { connect } from "react-redux";

import Loading from "../Loading";
import Timeline from "../Timeline";
import BoatRoute from "../BoatRoute";

class SpeedComparison extends Component {
    render() {
        const { data } = this.props;
        return(data ? 
            (
                <div className="rightRouteContainer">
                    <div className="visTimeline">
                        <div className="boxWhiskerAndLineChart">
                            <div>ALL OF THE VARS</div>
                            <div>LINE CHART SPEEED</div>
                        </div>
                        <Timeline withSpan={false} />
                    </div>
                    <BoatRoute withRouteHighlight={false} />
                </div>
            ) : (
                <Loading />
            )
        )
    }
}

const mapStateToProps = state => ({
    data: state.dataState.data,
});

export default connect(mapStateToProps)(SpeedComparison);