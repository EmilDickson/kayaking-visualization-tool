import React, { Component } from "react";
import { connect } from "react-redux";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class MiniLineChart extends Component {
    componentDidMount() {
        const { dataItem, variables } = this.props;
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.dataItemInstance = dataItem;

        // create axes
        let timeAxis = chart.xAxes.push(new am4charts.ValueAxis());
        timeAxis.renderer.minGridDistance = 50;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // create series
        for (let i = 0; i < variables.length; i++) {
            if (variables[i].active && variables[i].name !== "time") {
                let series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = "value";
                series.dataFields.valueX = "time";
                series.strokeWidth = 2;
                series.minBulletDistance = 10;
                series.tooltipText = "{valueY}";
                series.tooltip.pointerOrientation = "vertical";
                series.tooltip.background.cornerRadius = 20;
                series.tooltip.background.fillOpacity = 0.5;
                series.tooltip.label.padding(12, 12, 12, 12);
                series.data = this.generateChartData(variables[i].name);
            }
        }

        this.chart = chart;
    }

    generateChartData = variableName => {
        const { dataItem } = this.props;
        const chartData = dataItem.data.map(d => ({
            time: d.time - dataItem.minInDataSelection.time,
            value: d[variableName]
        }));
        return chartData;
    };

    generateLineData = () => {
        const { dataItem, minInDataSet, variables } = this.props;
        let data = [];
        if (dataItem && minInDataSet) {
            for (let i = 0; i < variables.length; i++) {
                if (variables[i].active && variables[i].name === "speed") {
                    data.push(
                        dataItem.data.map(d => {
                            let newElement = {
                                value: d["speed"],
                                time:
                                    d["time"] -
                                    dataItem.minInDataSelection["time"]
                            };
                            /* newElement[variables[i].name] = d[variables[i].name]; */
                            return newElement;
                        })
                    );
                }
            }
        }
        return data;
    };

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    componentDidUpdate(oldProps) {
        if (oldProps.dataItem !== this.props.dataItem) {
            console.log("hej hej")
            this.chart.dataItemInstance = this.props.dataItem;
        }
    }

    render() {
        return (
            <div id='chartdiv' style={{ width: "100%", height: "300px" }}></div>
        );
    }
}

const mapStateToProps = state => ({
    minInDataSet: state.dataState.minInDataSet,
    minInDataSelection: state.dataState.minInDataSelection,
    dataItems: state.dataState.dataItems,
    variables: state.variableState.variables
});

const mapDispatchToProps = dispatch => ({
    updateDataItem: dataItem => dispatch({ type: "UPDATE_DATA_ITEM", dataItem })
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniLineChart);
