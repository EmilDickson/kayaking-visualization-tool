import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "react-apexcharts";

import Timeline from "../Timeline";

class BubbleChart extends Component {
    generateChartData = () => {
        const { dataSelection } = this.props;
        const count = dataSelection.length;
        let i = 0;
        let series = {
            accSeries: [],
            rotSeries: [],
        };
        while (i < count) {
            // Acceleration: xAcc is the x-axis, zAcc is the y-axis and yAcc is the size (z-axis)
            // Rotation: xGyro is the y-axis, zGyro is the x-axis and yGyro is the size (z-axis)
            series.accSeries.push({
                x: dataSelection[i].xAcc,
                y: dataSelection[i].yAcc,
                z: Math.abs(dataSelection[i].zAcc),
            });
            series.rotSeries.push({
                x: dataSelection[i].xGyro,
                y: dataSelection[i].yGyro,
                z: Math.abs(dataSelection[i].zGyro),
            });
            i++;
        }
        return series;
    };

    generateTooltip = (index, side) => {
        const { dataSelection } = this.props;
        const xValue = side === "left" ? dataSelection[index]['xAcc'] : dataSelection[index]['xGyro'];
        const yValue = side === "left" ? dataSelection[index]['yAcc'] : dataSelection[index]['yGyro'];
        const zValue = side === "left" ? dataSelection[index]['zAcc'] : dataSelection[index]['zGyro'];
        const xString = side === "left" ? "<strong>xAcc: </strong>" : "<strong>xGyro: </strong>";
        const yString = side === "left" ? "<strong>yAcc: </strong>" : "<strong>yGyro: </strong>";
        const zString = side === "left" ? "<strong>zAcc: </strong>" : "<strong>zGyro: </strong>";
        return(
            '<div class="bubbleChartTooltip">' +
                xString + xValue + '<br/>' +
                yString + yValue + '<br/>' +
                zString + zValue + '<br/>' +
            '</div>'
            )
    }

    generateChartOptions = (side) => {
        const { maxInDataSelection, minInDataSelection } = this.props;
        return {
            chart: {
                toolbar: {
                    show: false
                },
                animations: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false,
            },
            fill: {
                opacity: 0.8,
                colors: ['#398FF3', '#67DF9C'],
            },
            title: {
                text: side === "left" ? "Acceleration" : "Rotation",
                align: 'center',
            },
            xaxis: {
                title: { text: side === "left" ? "xAcc" : "xGyro" },
                tickAmount: 10,
                tooltip: {
                    enabled: false
                },
                min:
                    side === "left"
                        ? minInDataSelection["xAcc"] - 0.5
                        : minInDataSelection["xGyro"] - 0.8,
                max:
                    side === "left"
                        ? maxInDataSelection["xAcc"] + 0.5
                        : maxInDataSelection["xGyro"] + 0.8,
            },
            yaxis: {
                title: { text: side === "left" ? "yAcc" : "yGyro" },
                max:
                    side === "left"
                        ? maxInDataSelection["yAcc"] + 0.25
                        : maxInDataSelection["yGyro"] + 5,
                min:
                    side === "left"
                        ? minInDataSelection["yAcc"] - 0.25
                        : minInDataSelection["yGyro"] - 5,
            },
            tooltip: {
                theme: 'dark',
                custom: ({series, seriesIndex, dataPointIndex, w}) => {
                    return(this.generateTooltip(dataPointIndex, side))
                },
                x: {
                    show: true,
                    formatter: (
                        value,
                        { series, seriesIndex, dataPointIndex, w }
                    ) =>
                        side === "left" ? "xAcc: " + value : "xGyro: " + value,
                },
                y: {
                    show: true,
                    title: () => side === "left" ? "yAcc" : "yGyro",
                    formatter: (
                        value,
                        { series, seriesIndex, dataPointIndex, w }
                    ) =>
                        side === "left" ? "yAcc: " + value : "yGyro: " + value,
                },
                z: {
                    show: true,
                    formatter: (
                        value,
                        { series, seriesIndex, dataPointIndex, w }
                    ) =>
                        side === "left" ? "zAcc: " + value : "zGyro: " + value,
                },
            },
        };
    };

    render() {
        const { selectedPoint } = this.props;
        const data = this.generateChartData();
        const accSeries = [
            {
                name: "Selected point",
                data: [{
                    x: selectedPoint['xAcc'],
                    y: selectedPoint['yAcc'],
                    z: Math.abs(selectedPoint['zAcc']),
                }]
            },
            {
                name: "Acceleration",
                data: data.accSeries,
            }
        ];
        const rotSeries = [
            {
                name: "Selected point",
                data: [{
                    x: selectedPoint['xGyro'],
                    y: selectedPoint['yGyro'],
                    z: Math.abs(selectedPoint['zGyro']),
                }]
            },
            {
                name: "Rotation",
                data: data.rotSeries,
            },
        ];
        const accOptions = this.generateChartOptions("left");
        const rotOptions = this.generateChartOptions("right");
        return (
            <div className='bubbleChartView'>
                <div className='boatBubbleChartContainer'>
                    <div>
                        <Chart
                            options={accOptions}
                            series={accSeries}
                            type='bubble'
                            height='600'
                        />
                    </div>
                    <div>
                        <Chart
                            options={rotOptions}
                            series={rotSeries}
                            type='bubble'
                            height='600'
                        />
                    </div>
                </div>
                <Timeline withSpan={true} withPlayButtons={true} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.dataState.data,
    dataSelection: state.dataState.dataSelection,
    selectedPoint: state.dataState.selectedPoint,
    maxInDataSelection: state.dataState.maxInDataSelection,
    minInDataSelection: state.dataState.minInDataSelection,
    variables: state.variableState.variables,
});

export default connect(mapStateToProps)(BubbleChart);
