import React, { PureComponent } from 'react';
import { connect  } from 'react-redux';
import ChartistGraph from 'react-chartist';

class BoatViewLineChart extends PureComponent {
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

    render() {
        const data = this.generateLineData();
        const options = {
            width: '1000px',
            height: '275px',
            showPoint: false,
            axisX: {
                labelInterpolationFnc: function(e) { return "" },
                showGrid: false
            },
            axisY: {
                showGrid: false,
            },
        };
        const type = "Line";
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