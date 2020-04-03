import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
    Chart,
    ArgumentAxis,
    AreaSeries,
    Legend,
    Title
} from "@devexpress/dx-react-chart-bootstrap4";
import "@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css";
import {
    stackOffsetWiggle,
    stackOrderInsideOut,
    curveCatmullRom,
    area
} from "d3-shape";
import { Stack, Animation } from "@devexpress/dx-react-chart";

const Area = props => {
    const path = area()
        .x(({ arg }) => arg)
        .y1(({ val }) => val)
        .y0(({ startVal }) => startVal)
        .curve(curveCatmullRom);

    return <AreaSeries.Path {...props} path={path} />;
};

class MiniStreamGraph extends Component {
    buildAreaSeries = (variables) => {
        let areaSeries = [];
        for (let i = 0; i < variables.length; i++) {
            if(variables[i] !== "time") {
                areaSeries.push(
                    <AreaSeries 
                        name={variables[i]}
                        valueField={variables[i]}
                        argumentField="time"
                        seriesComponent={Area}
                    />
                )
            }
        }
        return areaSeries;
    }

    getChartData = (variables) => {
        const { dataItem } = this.props;
        let chartData = [];
        for (let i = 0; i < dataItem.data.length; i++) {
            let newDataItem = {}
            for (let j = 0; j < variables.length; j++) {
                const dataMax = dataItem.maxInDataSelection[variables[j]];
                const dataMin = dataItem.minInDataSelection[variables[j]];
                const divider = dataMax !== 0 ? Math.abs(dataMax) : 1;
                const dataValue = dataItem.data[i][variables[j]];
                const adjustedValue = variables[j] === "time" ? dataValue - dataMin : dataValue / divider;
                newDataItem[variables[j]] = adjustedValue;
            }
            chartData.push(newDataItem);
        }
        return chartData;
    }

    render() {
        const { dataItem, updateDataItem, variables } = this.props;
        let variableNames = [];
        for (let i = 0; i < variables.length; i++) {
            if (variables[i].active) {
                variableNames.push(variables[i].name);
            }
        }
        const chartData = this.getChartData(variableNames);
        const areaSeries = this.buildAreaSeries(variableNames);
        return (
            <div
                className='miniStreamGraph'
                key={"miniStreamGraph_" + dataItem.id}
            >
                <div
                    className='miniStreamGraphHeader'
                    style={{ backgroundColor: dataItem.color }}
                >
                    <div>{"Start no. " + dataItem.id}</div>
                    <Button
                        aria-controls='streamGraphWindow'
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
                    <Chart data={chartData} style={{ paddingLeft: '20px' }}>
                        {<ArgumentAxis tickFormat={() => tick => tick} />}
                        {areaSeries}
                        <Animation />
                        <Legend />
                        <Stack
                            stacks={[
                            { series: variableNames },
                            ]}
                            offset={stackOffsetWiggle}
                            order={stackOrderInsideOut}
                        />
                    </Chart>
                </Collapse>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    dataItems: state.dataState.dataItems,
    variables: state.variableState.variables,
})

const mapDispatchToProps = dispatch => ({
    updateDataItem: dataItem => dispatch({ type: "UPDATE_DATA_ITEM", dataItem })
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniStreamGraph);
