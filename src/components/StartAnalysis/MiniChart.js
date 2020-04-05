import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import MiniSpanChart from './MiniSpanChart';

class MiniChart extends Component {
    render() {
        const { dataItem, updateDataItem } = this.props;
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
                                updateDataItem(updatedDataItem);
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
    updateDataItem: dataItem => dispatch({ type: "UPDATE_DATA_ITEM", dataItem })
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniChart)