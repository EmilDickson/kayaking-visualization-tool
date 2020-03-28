import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const DataItem = (data) => {
    return (
        <div className="dataItem" key={data}>
            {data}
        </div>
    )
}

class SideMenu extends Component {
    render() {
        const testData = ["test1", "test2"];
        const dataItems = testData.map(e => DataItem(e));
        return(
            <div className="radarChartSideMenu">
                {dataItems}
                <div className="addStart">
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    dataSelection: state.dataState.dataSelection,
})

export default connect(mapStateToProps)(SideMenu);