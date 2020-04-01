import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronUp,
    faChevronDown,
    faCheckCircle,
    faMinusCircle
} from "@fortawesome/free-solid-svg-icons";
import { Button, Collapse } from "react-bootstrap";

import BoatRoute from "../BoatRoute";
import Timeline from "../Timeline";
import Loading from "../Loading";

class DataItem extends Component {
    twoNumbers = stringIn => (stringIn.length < 2 ? "0" + stringIn : stringIn);

    timestampToMinutes = timeIn => {
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
            this.timestampToMinutes(dataItem.data[dataItem.data.length - 1].time)
        );
    };

    render() {
        const { dataItem, dataInitialized, deleteDataItem, updateDataItem } = this.props;
        if (dataInitialized) {
            return (
                <div className='dataItem'>
                    <div
                        className='dataItemHeader'
                    >
                        <Button
                            variant={dataItem.active ? "info" : "secondary"}
                            onClick={() => {
                                let updatedDataItem = { ...dataItem }
                                updatedDataItem.active = !dataItem.active;
                                updateDataItem(updatedDataItem)
                            }
                            }
                        >
                            <FontAwesomeIcon
                                icon={
                                    dataItem.active
                                        ? faCheckCircle
                                        : faMinusCircle
                                }
                                style={{
                                    marginTop: "-7px",
                                    marginLeft: "-5px"
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
                                updateDataItem(updatedDataItem);
                            }}
                            aria-controls='dataWindow'
                            aria-expanded={dataItem.open}
                        >
                            <FontAwesomeIcon
                                icon={
                                    dataItem.open
                                        ? faChevronUp
                                        : faChevronDown
                                }
                                style={{
                                    marginTop: "-7px",
                                    marginLeft: "-5px"
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
                            <div className='dataItemTime'>
                                {this.timeSpanString()}
                            </div>
                            <div className='dataItemTimespan'>
                                <Timeline withSpan={true} dataItem={dataItem} />
                            </div>
                            <Button
                                onClick={() => deleteDataItem(dataItem)}
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

const mapStateToProps = state => ({
    maxInDataSelection: state.dataState.maxInDataSelection,
    minInDataSelection: state.dataState.minInDataSelection,
    minInDataSet: state.dataState.minInDataSet,
    dataInitialized: state.dataState.dataInitialized
});

const mapDispatchToProps = dispatch => ({
    createDataItem: dataItem =>
        dispatch({ type: "CREATE_DATA_ITEM", dataItem }),
    deleteDataItem: dataItem =>
        dispatch({ type: "DELETE_DATA_ITEM", dataItem }),
    updateDataItem: dataItem => 
        dispatch({ type: "UPDATE_DATA_ITEM", dataItem })
});

export default connect(mapStateToProps, mapDispatchToProps)(DataItem);
