import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronUp,
    faChevronDown,
    faCheckCircle,
    faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Collapse } from "react-bootstrap";
import ChartistGraph from "react-chartist";

import { withFirebase } from "../Firebase";
import { deleteHelper, updateHelper } from "../../dataItemTools";
import BoatRoute from "../BoatRoute";
import Timeline from "../Timeline";
import Loading from "../Loading";

class DataItem extends Component {
    twoNumbers = (stringIn) =>
        stringIn.length < 2 ? "0" + stringIn : stringIn;

    timestampToMinutes = (timeIn) => {
        const { minInDataSet } = this.props;
        const seconds = Math.round(
            ((timeIn - minInDataSet.time) / 1000) % 60
        ).toString();
        const minutes = Math.floor(
            (timeIn - minInDataSet.time) / 1000 / 60
        ).toString();
        return this.twoNumbers(minutes) + ":" + this.twoNumbers(seconds);
    };

    timeSpanString = () => {
        const { dataItem } = this.props;
        return (
            this.timestampToMinutes(dataItem.data[0].time) +
            " - " +
            this.timestampToMinutes(
                dataItem.data[dataItem.data.length - 1].time
            )
        );
    };

    generateLineChart = () => {
        const { data, dataItem, maxInDataSet, minInDataSet } = this.props;
        const timePoints = dataItem.timelinePoints;
        let dataOut = {
            labels: ["0"],
            series: [
                {
                    className: "chartist-mini-speed-all",
                    data: [{ meta: "speed-all", value: data[0]["speed"] }],
                },
                {
                    className: "chartist-mini-speed-selection",
                    data: [{ meta: "speed-selection", value: null }],
                },{
                className: "chartist-verticalLine",
                data: [{ meta: "verticalLine", value: null }]
            },
            ],
        };
        const length = data.length;
        let selectionIndex = 0;
        for (let i = 1; i < length; i++) {
            dataOut.labels.push(i.toString());
            dataOut.series[0].data.push(
                { meta: "speed-all", value: data[i]["speed"] },
            );
            if (i >= timePoints[0] && i < timePoints[2]) {
                dataOut.series[1].data.push(
                    {
                        meta: "speed-selection",
                        value: dataItem.data[selectionIndex]["speed"],
                    },
                );
                selectionIndex += 1;
            } else {
                dataOut.series[1].data.push(
                    { meta: "speed-selection", value: null },
                );
            }
            if (i === timePoints[1]) {
                dataOut.series[2].data.push({
                    meta: "verticalLine",
                    value: minInDataSet["speed"]
                })
            } else if (i - 1 === timePoints[1]) {
                dataOut.series[2].data.push({
                    meta: "verticalLine",
                    value: maxInDataSet["speed"]
                })
            } else {
                dataOut.series[2].data.push({
                    meta: "verticalLine",
                    value: null
                })
            }
        }
        const options = {
            width: "420px",
            height: "100px",
            showPoint: false,
            axisX: {
                labelInterpolationFnc: function (e) {
                    return "";
                },
                showGrid: false,
            },
            axisY: {
                showGrid: true,
            },
        };
        const type = "Line";
        return { dataOut, options, type };
    };

    render() {
        const {
            dataItem,
            dataInitialized,
            updateDataItem,
            deleteDataItem,
            dataItems,
        } = this.props;
        if (dataInitialized) {
            const lineChartSettings = this.generateLineChart();
            return (
                <div className='dataItem'>
                    <div
                        className='dataItemHeader'
                        style={{ backgroundColor: dataItem.color }}
                    >
                        <Button
                            variant={dataItem.active ? "info" : "secondary"}
                            onClick={() => {
                                let updatedDataItem = { ...dataItem };
                                updatedDataItem.active = !dataItem.active;
                                const newDataItems = updateHelper(
                                    updatedDataItem,
                                    dataItems
                                );
                                this.props.firebase.setUserDataItems(
                                    newDataItems
                                );
                                updateDataItem(newDataItems);
                            }}
                        >
                            <FontAwesomeIcon
                                icon={
                                    dataItem.active
                                        ? faCheckCircle
                                        : faMinusCircle
                                }
                                style={{
                                    marginTop: "-7px",
                                    marginLeft: "-5px",
                                    position: "absolute",
                                }}
                            />
                        </Button>
                        <div className='dataItemTitle'>
                            Start no. {dataItem.id}
                        </div>
                        <Button
                            onClick={() => {
                                let updatedDataItem = { ...dataItem };
                                updatedDataItem.open = !dataItem.open;
                                const newDataItems = updateHelper(
                                    updatedDataItem,
                                    dataItems
                                );
                                this.props.firebase.setUserDataItems(
                                    newDataItems
                                );
                                updateDataItem(newDataItems);
                            }}
                            aria-controls='dataWindow'
                            aria-expanded={dataItem.open}
                        >
                            <FontAwesomeIcon
                                icon={
                                    dataItem.open ? faChevronUp : faChevronDown
                                }
                                style={{
                                    marginTop: "-7px",
                                    marginLeft: "-5px",
                                    position: "absolute",
                                }}
                            />
                        </Button>
                    </div>
                    <Collapse in={dataItem.open}>
                        <div id='dataItemWindow'>
                            <BoatRoute
                                type={"small"}
                                withRouteHighlight={true}
                                dataItem={dataItem}
                            />
                            <hr />
                            <div className='miniLineChart'>
                                <ChartistGraph
                                    className='ct-chart'
                                    data={lineChartSettings.dataOut}
                                    options={lineChartSettings.options}
                                    type={lineChartSettings.type}
                                />
                                <div className="miniLineChartLegend">
                                    <p style={{ color: 'blue' }}>Entire set</p>
                                    <p style={{ color: 'green', fontWeight: 'bold' }}>Selection</p>
                                    <p>{"Current: " + dataItem.selectedPoint.speed}</p>
                                </div>
                            </div>
                            <hr />
                            <div className='dataItemTime'>
                                {this.timeSpanString()}
                            </div>
                            <div className='dataItemTimespan'>
                                <Timeline withSpan={true} dataItem={dataItem} />
                            </div>
                            <Button
                                onClick={() => {
                                    const newDataItems = deleteHelper(
                                        dataItem,
                                        dataItems
                                    );
                                    this.props.firebase.setUserDataItems(
                                        newDataItems
                                    );
                                    deleteDataItem(newDataItems);
                                }}
                                variant='danger'
                                style={{ width: "100%", marginTop: "5px" }}
                            >
                                DELETE
                            </Button>
                        </div>
                    </Collapse>
                </div>
            );
        } else {
            return <Loading />;
        }
    }
}

const mapStateToProps = (state) => ({
    data: state.dataState.data,
    maxInDataSelection: state.dataState.maxInDataSelection,
    minInDataSelection: state.dataState.minInDataSelection,
    maxInDataSet: state.dataState.maxInDataSet,
    minInDataSet: state.dataState.minInDataSet,
    dataInitialized: state.dataState.dataInitialized,
    dataItems: state.dataState.dataItems,
});

const mapDispatchToProps = (dispatch) => ({
    deleteDataItem: (newDataItems) =>
        dispatch({ type: "DELETE_DATA_ITEM", newDataItems }),
    updateDataItem: (newDataItems) =>
        dispatch({ type: "UPDATE_DATA_ITEM", newDataItems }),
});

export default compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(DataItem);
