import React, { PureComponent } from 'react';
import { connect  } from 'react-redux';
import { JSCharting } from "jscharting-react";

import Loading from '../Loading';

class BoatViewLineChart extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            series: null,
            timePoint: 0
        }
    }

    generateLineData = () => {
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
                        x: data[j]["time"]
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
    }

    render() {
        const lineConfig = {
            type: "line",
            width: 1050,
            height: 300,
            series: this.generateLineData(),
            xAxis: { 
                visible: false,
                crosshair_enabled: true,
                /* customTicks: [{
                    value: this.state.timePoint,
                    includeInScale: true, 
                    line_length: 9,
                    gridLine: { color: '#568bdc', width: 2 },
                }] */
            },
            title_label_text: "All variables",
            legend: { 
                template: '%icon %name', 
                margin: 0, 
                position: 'top right'
            }
        };
        return <JSCharting options={lineConfig} mutable={true} />
    }
}

const mapStateToProps = state => ({
    data: state.dataState.data,
    variables: state.variableState.variables
});

export default connect(mapStateToProps)(BoatViewLineChart);