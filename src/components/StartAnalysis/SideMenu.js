import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

import { createHelper } from "../../dataItemTools";
import { withFirebase } from "../Firebase";
import DataItem from "./DataItem";
import Loading from "../Loading";

class SideMenu extends Component {
    addNewDataItem = () => {
        const {
            dataItems,
            dataSelection,
            createDataItem,
            selectedPoint,
            timelinePoints,
        } = this.props;
        const newId =
            dataItems.length > 0 ? dataItems[dataItems.length - 1].id + 1 : 1;
        const dataItem = {
            id: newId,
            data: dataSelection,
            selectedPoint: selectedPoint,
            timelinePoints: timelinePoints,
            active: true,
            open: false,
        };
        const newDataItems = createHelper(dataItem, dataItems);
        this.props.firebase.setUserDataItems(newDataItems);
        createDataItem(newDataItems);
    };

    render() {
        const { dataItems, dataInitialized } = this.props;
        const dataItemObjects = dataItems.map((e) => (
            <DataItem dataItem={e} key={"dataItem_" + e.id} />
        ));
        if (dataInitialized) {
            return (
                <div className='radarChartSideMenu'>
                    <div className='dataItemsHeadline'>ALL STARTS</div>
                    {dataItemObjects}
                    <Button
                        className='addStart'
                        onClick={this.addNewDataItem}
                        disabled={dataItems.length > 9}
                    >
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </Button>
                </div>
            );
        } else {
            return <Loading />;
        }
    }
}

const mapStateToProps = (state) => ({
    dataSelection: state.dataState.dataSelection,
    dataItems: state.dataState.dataItems,
    dataInitialized: state.dataState.dataInitialized,
    selectedPoint: state.dataState.selectedPoint,
    timelinePoints: state.logicState.timelinePoints,
});

const mapDispatchToProps = (dispatch) => ({
    createDataItem: (newDataItems) =>
        dispatch({ type: "CREATE_DATA_ITEM", newDataItems }),
});

export default compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(SideMenu);
