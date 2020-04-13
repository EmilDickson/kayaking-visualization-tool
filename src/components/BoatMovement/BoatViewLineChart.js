import React, { PureComponent } from 'react';
import { connect  } from 'react-redux';
import ChartistGraph from 'react-chartist';

class BoatViewLineChart extends PureComponent {
    /* generateLineData = () => {
        const { data, variables } = this.props;
        const variableColors = [
            "#0000E3",
            "#0047FF",
            "#00ABFF",
            "#0FFFEF",
            "#43FFBB",
            "#73FF8B",
            "#A7FF57",
            "#FFEF00",
            "#FF8B00",
            "#FF5700",
            "#FF2300",
            "#ED0000",
            "#830000"
        ];
        let dataOut = []
        for (let i = 0; i < variables.length; i++) {
            if (variables[i].active && variables[i].name !== "time") {
                let elements = [];
                for (let j = 0, length = data.length; j < length; j++) {
                    elements.push({
                        y: data[j][variables[i].name],
                        x: j.toString()
                    });
                }
                dataOut.push({
                    name: variables[i].name,
                    color: variableColors[i],
                    points: elements
                });
            }
        }
        return dataOut;
    } */

    getMaxMin = () => {
        const { variables, maxInDataSelection, minInDataSelection } = this.props;
        let maxValues = [];
        let minValues = [];
        for (let i = 0; i < variables.length; i++) {
            if (variables[i].name !== "time" && variables[i].active) {
                maxValues.push(maxInDataSelection[variables[i].name]);
                minValues.push(minInDataSelection[variables[i].name]);
            }
        }
        const max = Math.max.apply(Math, maxValues.map(o => o));
        const min = Math.min.apply(Math, minValues.map(o => o));
        return {max: max, min: min}
    }

    generateLineData = () => {
        const { data, variables, timelinePoints } = this.props;
        const length = data.length;
        const selectedPoint = timelinePoints[1] - timelinePoints[0];
        const maxMin = this.getMaxMin();
        let variableNames = [];
        let dataOut = {
            labels: [],
            series: []
        };
        if (length > 1) {
            dataOut.labels.push("0");
            for (let i = 0; i < variables.length; i++) {
                if (variables[i].active && variables[i].name !== "time") {
                    variableNames.push(variables[i].name);
                    dataOut.series.push({
                            className: "chartist-" + variables[i].name,
                            data: [{meta: variables[i].name, value: data[0][variables[i].name]}]
                    },);
                }
            }
            dataOut.series.push({
                className: "chartist-verticalLine",
                data: [{meta: "verticalLine", value: null}]
            })
        }
        for (let i = 1; i < length; i++) {
            dataOut.labels.push(i.toString());
            for (let j = 0; j < variableNames.length; j++) {
                dataOut.series[j].data.push({
                    meta: variableNames[j],
                    value: data[i][variableNames[j]]
                });
            }
            if (i === selectedPoint) {
                dataOut.series[variableNames.length].data.push({
                    meta: "verticalLine",
                    value: maxMin.min
                })
            } else if (i - 1 === selectedPoint) {
                dataOut.series[variableNames.length].data.push({
                    meta: "verticalLine",
                    value: maxMin.max
                })
            } else {
                dataOut.series[variableNames.length].data.push({
                    meta: "verticalLine",
                    value: null
                })
            }
        }
        return dataOut;
    }

    /* generateSeriesOptions = (series) => {
        let seriesOptions = {}
        for (let i = 0; i < series.length; i++) {
            seriesOptions[series[i][0].name] = {
                className: "chartist-" + series[i][0].name
            }
        }
        return seriesOptions;
    } */

    render() {
        const { timelinePoints } = this.props;
        const data = this.generateLineData();
        const selectedPoint = timelinePoints[1] - timelinePoints[0];
        /* const seriesOptions = this.generateSeriesOptions(data.series); */
        const options = {
            width: '1000px',
            height: '275px',
            showPoint: false,
            /* series: seriesOptions, */
            axisX: {
                labelInterpolationFnc: function(e) { return "" },
                showGrid: false
            },
            axisY: {
                showGrid: false,
            },
        };
        /* console.log(seriesOptions); */
        const type = "Line";
        // const { timelinePoint } = this.props;
        // const lineConfig = {
        //     type: "line",
        //     width: 1050,
        //     height: 300,
        //     series: this.generateLineData(),
        //     xAxis: { 
        //         visible: false,
        //         crosshair_enabled: true,
        //         customTicks: [{
        //             value: timelinePoint,
        //             includeInScale: true, 
        //             line_length: 9,
        //             gridLine: { color: '#568bdc', width: 2 },
        //         }]
        //     },
        //     title_label_text: "All variables",
        //     legend: { 
        //         template: '%icon %name', 
        //         margin: 0, 
        //         position: 'top right'
        //     }
        // };
        // return <JSCharting options={lineConfig} mutable={true} />
        return <ChartistGraph className="ct-chart" data={data} options={options} type={type} />
    }
}

const mapStateToProps = state => ({
    data: state.dataState.dataSelection,
    variables: state.variableState.variables,
    timelinePoints: state.logicState.timelinePoints,
    maxInDataSelection: state.dataState.maxInDataSelection,
    minInDataSelection: state.dataState.minInDataSelection,
});

export default connect(mapStateToProps)(BoatViewLineChart);