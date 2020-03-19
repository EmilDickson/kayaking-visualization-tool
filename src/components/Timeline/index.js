import React, { Component } from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";

class Timeline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: false
        };
    }

    timeOut = i => {
        setTimeout(() => {
            if (i < this.props.dataSelection.length && this.state.playing) {
                this.props.setSelectedPoint(this.props.dataSelection[i]);
                this.timeOut(i + 1);
            }
        }, 300);
    };

    handlePlaying = () => {
        if (this.props.dataSelection) {
            this.setState({
                playing: !this.state.playing
            });
            this.timeOut(0);
        }
    };

    handleRangeChange = rangeChange => {
        this.props.setDataSelection(
            this.props.data.slice(rangeChange[0], rangeChange[2])
        );
        this.props.setSelectedPoint(this.props.data[rangeChange[1]]);
    };

    render() {
        const { data } = this.props;
        let defaultValues = [
            Math.round(data.length / 8),
            Math.round(data.length / 4),
            Math.round(data.length / 2)
        ];

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
                    {this.state.playing ? (
                        <FontAwesomeIcon
                            icon={faPauseCircle}
                            size="2x"
                            onClick={this.handlePlaying}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faPlayCircle}
                            size="2x"
                            onClick={this.handlePlaying}
                        />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.dataState.data,
    dataSelection: state.dataState.dataSelection
});

const mapDispatchToProps = dispatch => ({
    setDataSelection: dataSelection =>
        dispatch({ type: "SET_DATA_SELECTION", dataSelection }),
    setSelectedPoint: selectedPoint =>
        dispatch({ type: "SET_SELECTED_POINT", selectedPoint })
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
