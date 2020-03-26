import React, { Component } from "react";
import rd3 from "react-d3-library";
import { connect } from "react-redux";

import getElement from "./SpanChart";

const RD3Component = rd3.Component;

class SpanChart extends Component {
    checkVariables = (variable) => {
        if (variable.active) {
            return variable.name
        }
    }
    getData = () => {
        const noVizVariables = ["time", "lat", "long"];
        const max = Object.entries(this.props.maxInDataSelection);
        const min = Object.entries(this.props.minInDataSelection);
        const totalMax = Object.entries(this.props.maxInDataSet);
        const totalMin = Object.entries(this.props.minInDataSet);
        const point = Object.entries(this.props.selectedPoint);
        let variables = this.props.variables.map(this.checkVariables);
        let data = [];
        for (let i = 0; i < min.length; i++) {
            if (!(noVizVariables.includes(min[i][0])) && (variables.includes(min[i][0]))) {
                data.push({
                    "variable": min[i][0],
                    "to": max[i][1],
                    "from": min[i][1],
                    "totalMax": totalMax[i][1],
                    "totalMin": totalMin[i][1],
                    "point": point[i][1]
                })
            }
        }
        return data;
    }

    componentDidMount() {
        // initiialize Span Chart element
        this.props.setSpanChartElement(this.getData());
    }

    render() {
        const element = {d3: getElement(this.getData())}
        return (
            <div className="spanChartContainer">
                <RD3Component data={ element.d3 } />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    dataSelection: state.dataState.dataSelection,
    maxInDataSelection: state.dataState.maxInDataSelection,
    minInDataSelection: state.dataState.minInDataSelection,
    maxInDataSet: state.dataState.maxInDataSet,
    minInDataSet: state.dataState.minInDataSet,
    selectedPoint: state.dataState.selectedPoint,
    spanChartElement: state.logicState.spanChartElement,
    variables: state.variableState.variables,
})

const mapDispatchToProps = dispatch => ({
    setSpanChartElement: element => dispatch({ type: "SET_SPAN_CHART_ELEMENT", element })
})

export default connect(mapStateToProps, mapDispatchToProps)(SpanChart);
