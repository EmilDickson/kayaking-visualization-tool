import React, { Component } from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { connect } from "react-redux";

class Timeline extends Component {
    handleRangeChange = rangeChange => {
        this.props.setDataSelection(this.props.data.slice(rangeChange[0], rangeChange[2]));
        this.props.setSelectedPoint(this.props.data[rangeChange[1]]);
    }
    
    render() {
        const { data } = this.props;
        let defaultValues = [Math.round(data.length / 8), Math.round(data.length / 4), Math.round(data.length / 2)];

        return (
            <div className="timelineContainer">
                <div className="timeline">
                    <Range
                        min={0}
                        max={data.length - 1}
                        count={2}
                        defaultValue={defaultValues}
                        pushable
                        onAfterChange={e => this.handleRangeChange(e)}
                    />
                    Time
                </div>
                <div className="playButton">
                    <p>Play</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.dataState.data
});

const mapDispatchToProps = dispatch => ({
    setDataSelection: dataSelection =>
        dispatch({ type: "SET_DATA_SELECTION", dataSelection }),
    setSelectedPoint: selectedPoint =>
        dispatch({ type: "SET_SELECTED_POINT", selectedPoint })
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
