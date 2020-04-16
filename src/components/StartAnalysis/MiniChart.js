import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from "recompose";
import { Button, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { withFirebase } from "../Firebase";
import { updateHelper } from "../../dataItemTools";
import MiniSpanChart from './MiniSpanChart';

class MiniChart extends Component {
    render() {
        const { dataItem, updateDataItem, dataItems } = this.props;
        return(
            <div>
                <div
                className='miniGraph'
                key={"miniGraph_" + dataItem.id}
            >
                <div
                    className='miniGraphHeader'
                    style={{ backgroundColor: dataItem.color }}
                >
                    <div>{"Start no. " + dataItem.id}</div>
                    <Button
                        aria-controls='miniGraphWindow'
                        aria-expanded={dataItem.graphOpen}
                    >
                        <FontAwesomeIcon
                            onClick={() => {
                                let updatedDataItem = { ...dataItem };
                                updatedDataItem.graphOpen = !dataItem.graphOpen;
                                const newDataItems = updateHelper(updatedDataItem, dataItems);
                                this.props.firebase.setUserDataItems(newDataItems);
                                updateDataItem(newDataItems);
                            }}
                            icon={
                                dataItem.graphOpen ? faChevronUp : faChevronDown
                            }
                            style={{
                                marginTop: "-7px",
                                marginLeft: "-5px",
                                position: "absolute"
                            }}
                        />
                    </Button>
                </div>
                <Collapse in={dataItem.graphOpen}>
                    <div className="miniGraphWindow">
                        <MiniSpanChart dataItem={dataItem} />
                    </div>
                </Collapse>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    dataItems: state.dataState.dataItems,
    variables: state.variableState.variables,
})

const mapDispatchToProps = dispatch => ({
    updateDataItem: newDataItems => dispatch({ type: "UPDATE_DATA_ITEM", newDataItems })
});

export default compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
)(MiniChart)