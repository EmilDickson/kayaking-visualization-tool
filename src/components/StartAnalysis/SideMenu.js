import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlusCircle,
    faChevronUp,
    faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { Button, Collapse } from "react-bootstrap";

import DataItem from "./DataItem";
import Loading from "../Loading";

class SideMenu extends Component {
    addNewDataItem = () => {
        const { dataItems, dataSelection, createDataItem } = this.props;
        const newId = dataItems.length > 0 ? dataItems[dataItems.length - 1].id + 1 : 1;
        const dataItem = {
            id: newId,
            data: dataSelection,
            active: false,
            open: false,
        }
        createDataItem(dataItem);
    }

    render() {
        const { dataItems, dataInitialized } = this.props;
        const dataItemObjects = dataItems.map(e => <DataItem dataItem={e} key={"dataItem_" + e.id} />)
        if (dataInitialized) {
            return (
                <div className="radarChartSideMenu">
                    {dataItemObjects}
                    <Button className="addStart" onClick={this.addNewDataItem}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </Button>
                </div>
            );
        } else {
            return (
                <Loading />
            )
        }
    }
}

const mapStateToProps = state => ({
    dataSelection: state.dataState.dataSelection,
    dataItems: state.dataState.dataItems,
    dataInitialized: state.dataState.dataInitialized,
});

const mapDispatchToProps = dispatch => ({
    createDataItem: dataItem =>
        dispatch({ type: "CREATE_DATA_ITEM", dataItem }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
