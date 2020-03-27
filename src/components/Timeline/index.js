import React, { Component } from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";

class Timeline extends Component {
    timeOutPoint = (i, valuesIn) => {
        setTimeout(() => {
            if (i < this.props.dataSelection.length && this.props.playingPoint) {
                this.props.setSelectedPoint(this.props.dataSelection[i]);
                const valuesOut = [
                    valuesIn[0],
                    valuesIn[1] + 1,
                    valuesIn[2]
                ]
                this.props.setTimelinePoints(valuesOut);
                this.timeOutPoint(i + 1, valuesOut);
            }
        }, 300);
    };

    handlePlayingPoint = () => {
        if (this.props.dataSelection) {
            this.props.setTimelinePlayingPoint(!this.props.playingPoint)
            const values = [
                this.props.timelinePoints[0],
                this.props.timelinePoints[0],
                this.props.timelinePoints[2]
            ]
            this.timeOutPoint(0, values);
        }
    };

    timeOutSpan = (i, valuesIn) => {
        const step = valuesIn[2] - valuesIn[0];
        setTimeout(() => {
            if (valuesIn[2] < this.props.data.length && this.props.playingSpan) {
                this.props.setDataSelection(
                    this.props.data.slice(valuesIn[0], valuesIn[2])
                );
                this.props.setSelectedPoint(this.props.data[valuesIn[1]]);
                const valuesOut = valuesIn.map(j => j + step);
                this.props.setTimelinePoints(valuesOut);
                this.timeOutSpan(i + step, valuesOut);
            }
        }, 500);
    };

    handlePlayingSpan = () => {
        if (this.props.dataSelection) {
            this.props.setTimelinePlayingSpan(!this.props.playingSpan);
            this.timeOutSpan(0, this.props.timelinePoints);
        }
    }

    handleRangeChange = rangeChange => {
        this.props.setDataSelection(
            this.props.data.slice(rangeChange[0], rangeChange[2])
        );
        this.props.setSelectedPoint(this.props.data[rangeChange[1]]);
        this.props.setTimelinePoints(rangeChange);
    };

    render() {
        const { data, playingPoint, playingSpan, timelinePoints } = this.props;
        return (
            <div className="timelineContainer">
                <div className="timeline">
                    <Range
                        min={0}
                        max={data.length - 1}
                        count={2}
                        value={timelinePoints}
                        pushable
                        onChange={e => this.handleRangeChange(e)}
                    />
                    Time
                </div>
                <div className="playButtonContainer">
                    <div className="playButton">
                        <div>
                            {playingPoint ? (
                                <FontAwesomeIcon
                                    icon={faPauseCircle}
                                    size="2x"
                                    onClick={this.handlePlayingPoint}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faPlayCircle}
                                    size="2x"
                                    onClick={this.handlePlayingPoint}
                                />
                            )}
                        </div>
                        <div className="playButtonLabel">Span</div>
                    </div>
                    <div className="playButton">
                        <div>
                            {playingSpan ? (
                                <FontAwesomeIcon
                                    icon={faPauseCircle}
                                    size="2x"
                                    onClick={this.handlePlayingSpan}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faPlayCircle}
                                    size="2x"
                                    onClick={this.handlePlayingSpan}
                                />
                            )}
                        </div>
                        <div className="playButtonLabel">All</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.dataState.data,
    dataSelection: state.dataState.dataSelection,
    playingPoint: state.logicState.timelinePlayingPoint,
    playingSpan: state.logicState.timelinePlayingSpan,
    timelinePoints: state.logicState.timelinePoints,
});

const mapDispatchToProps = dispatch => ({
    setDataSelection: dataSelection =>
        dispatch({ type: "SET_DATA_SELECTION", dataSelection }),
    setSelectedPoint: selectedPoint =>
        dispatch({ type: "SET_SELECTED_POINT", selectedPoint }),
    setTimelinePlayingPoint: timelinePlayingPoint => 
        dispatch({ type: "SET_TIMELINE_PLAYING_POINT", timelinePlayingPoint }),
    setTimelinePlayingSpan: timelinePlayingSpan => 
        dispatch({ type: "SET_TIMELINE_PLAYING_SPAN", timelinePlayingSpan }),
    setTimelinePoints: timelinePoints =>
        dispatch({ type: "SET_TIMELINE_POINTS", timelinePoints })
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
