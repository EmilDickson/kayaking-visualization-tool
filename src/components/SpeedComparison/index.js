import React, { Component } from "react";
import { connect } from "react-redux";
import AnyChart from "anychart-react";

import Loading from "../Loading";
import Timeline from "../Timeline";
import BoatRoute from "../BoatRoute";

class SpeedComparison extends Component {
    generateBoxAndWhiskerData = () => {
        const {
            variables,
            data,
            maxInDataSet,
            minInDataSet,
            selectedPoint,
            dataSelection,
            minInDataSelection,
            maxInDataSelection
        } = this.props;
        let dataOut = [];
        if (data && variables.length > 1) {
            for (let i = 0; i < variables.length; i++) {
                if (
                    variables[i].active &&
                    variables[i].name !== "speed" &&
                    variables[i].name !== "time"
                ) {
                    const name = variables[i].name;
                    dataOut.push({
                        x: name,
                        low: minInDataSet[name],
                        q1: minInDataSelection[name],
                        median: this.quartile(dataSelection, 0.5, name),
                        q3: maxInDataSelection[name],
                        high: maxInDataSet[name],
                        outliers: [selectedPoint[name]]
                    });
                }
            }
        }
        return dataOut;
    };

    quartile = (dataIn, q, name) => {
        // cred (but only used for median): https://stackoverflow.com/a/48719875
        let data = dataIn.map(d => d[name]);
        data = data.sort((a, b) => a - b);
        const pos = (data.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if (data[base + 1]) {
            return data[base] + rest * (data[base + 1] - data[base]);
        } else {
            return data[base];
        }
    };

    generateLineData = () => {
        const {
            data,
            selectedPoint,
            minInDataSet,
            minInDataSelection,
            maxInDataSelection
        } = this.props;
        let speedData = [];
        if (data && selectedPoint && minInDataSet) {
            speedData = data.map(d => {
                let newElement = {
                    x: d["time"] - minInDataSet["time"],
                    value: d["speed"]
                };
                if (d["time"] === minInDataSelection["time"]) {
                    newElement["marker"] = {
                        enabled: true,
                        type: "circle",
                        fill: "blue",
                        size: 3
                    };
                }
                if (d["time"] === selectedPoint["time"]) {
                    newElement["marker"] = {
                        enabled: true,
                        type: "circle",
                        fill: "green",
                        size: 5
                    };
                    newElement["label"] = {
                        enabled: true,
                        fontColor: "green",
                        fontWeight: 900,
                        format: "{%value} m/s"
                    };
                }
                if (d["time"] === maxInDataSelection["time"]) {
                    newElement["marker"] = {
                        enabled: true,
                        type: "circle",
                        fill: "blue",
                        size: 3
                    };
                }
                return newElement;
            });
        }
        return speedData;
    };

    render() {
        if (this.props.data) {
            const boxAndWhiskerSettings = {
                width: 1100,
                height: 380,
                type: "box",
                data: this.generateBoxAndWhiskerData(),
                title: "Chosen variables",
                tooltip: {
                    titleFormat: "{%x}",
                    format:
                        "Min, data set: {%low} \nMin, selection: {%q1} \nMedian, selection: {%median} \nMax, selection: {%q3} \nMax, data set: {%high} \nAt selected point: {%outliers}"
                }
            };
            const lineChartSettings = {
                width: 1100,
                height: 240,
                type: "line",
                data: this.generateLineData(),
                title: "Speed",
                tooltip: {
                    titleFormat: "Speed",
                    format: "{%value} m/s"
                }
            };
            return (
                <div className="rightRouteContainer">
                    <div className="visTimeline">
                        <div className="boxWhiskerAndLineChart">
                            <AnyChart {...boxAndWhiskerSettings} />
                            <AnyChart {...lineChartSettings} />
                        </div>
                        <Timeline withSpan={true} />
                    </div>
                    <BoatRoute withRouteHighlight={true} />
                </div>
            );
        } else {
            return <Loading />;
        }
    }
}

const mapStateToProps = state => ({
    variables: state.variableState.variables,
    data: state.dataState.data,
    maxInDataSet: state.dataState.maxInDataSet,
    minInDataSet: state.dataState.minInDataSet,
    selectedPoint: state.dataState.selectedPoint,
    dataSelection: state.dataState.dataSelection,
    maxInDataSelection: state.dataState.maxInDataSelection,
    minInDataSelection: state.dataState.minInDataSelection
});

export default connect(mapStateToProps)(SpeedComparison);
