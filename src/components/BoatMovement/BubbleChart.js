import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "react-apexcharts";

import Timeline from "../Timeline";

/* const BubbleChartContainer = (data, side) => {
    const chartConfig = {
        type: "bubble",
        annotations: [
            {
                label: {
                    text: side === "left" ? "Acceleration" : "Rotation",
                },
                position: "top left",
            },
        ],
        width: 500,
        height: 600,
        series: data,
        animation_duration: 500,
        legend: { template: "%lecb,%icon,%name", position: "inside left top" },
    };
    return <JSCharting options={chartConfig} mutable={true} />;
}; */

class BubbleChart extends Component {
    // generateChartData = () => {
    //     const { data, selectedPoint } = this.props;
    //     let dataOut = {
    //         chart1: [],
    //         chart2: [],
    //     };
    //     // Ngn slags for-loop som lägger in saker i rätt lådor baserat på variabler.
    //     for (let i = 0, length = data.length; i < length; i++) {
    //         dataOut.chart1.push({
    //             id: data[i]["time"],
    //             x: data[i]["xAcc"],
    //             y: data[i]["yAcc"],
    //             z: data[i]["zAcc"],
    //             attributes_state: data[i]["time"],
    //         });
    //         dataOut.chart2.push({
    //             id: data[i]["time"],
    //             x: data[i]["xGyro"],
    //             y: data[i]["yGyro"],
    //             z: data[i]["zGyro"],
    //             attributes_state: data[i]["time"],
    //         });
    //     }
    //     return dataOut;
    // };

    /* DUMMY DATA BELOW
    generateChartData = () => {
        const { dataSelection } = this.props;
        const count = dataSelection.length;
        let i = 0;
        let series = [];
        while (i < count) {
            const x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
            const y = Math.floor(Math.random() * (60 - 10 + 1)) + 10;
            const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

            series.push([x, y, z])
            i++
        }
        return series;
    } */

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
            dataLabels: {
                enabled: false,
            },
            animations: {
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
            toolbar: {
                show: false,
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
        // Här genererar vi lite data först, sedan skapar vi två bubble charts och skickar varsin del av datat + left/right
        // const data = this.generateChartData();
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
