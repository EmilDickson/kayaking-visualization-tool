import React, { Component } from "react";
import { connect } from "react-redux";
import { JSCharting } from "jscharting-react";

class MiniLineChart extends Component {
    generateLineData = () => {
        const { dataItem, minInDataSet, variables } = this.props;
        const variableColors = ['#0000E3','#0047FF','#00ABFF','#0FFFEF','#43FFBB','#73FF8B','#A7FF57','#FFEF00','#FF8B00','#FF5700','#FF2300','#ED0000','#830000'];
        let data = [];
        if (dataItem && minInDataSet) {
            for (let i = 0; i < variables.length; i++) {
                if (variables[i].active && variables[i].name !== "time") {
                    let elements = [];
                    for (
                        let j = 0, length = dataItem.data.length;
                        j < length;
                        j++
                    ) {
                        elements.push({
                            y:  dataItem.data[j][variables[i].name],
                            x:  dataItem.data[j]["time"]
                        });
                    }
                    data.push({
                        name: variables[i].name,
                        color: variableColors[i],
                        points: elements
                    });
                }
            }
        }
        return data;
    };

    divideByMax = (value, variableName) => {
        const { dataItem } = this.props;
        const dataMax = dataItem.maxInDataSelection[variableName];
        const divider = dataMax !== 0 ? Math.abs(dataMax) : 1;
        return value / divider;
    }

    render() {
        const lineData = this.generateLineData();
        const config = {
            type: "line",
            width: 430,
            height: 300,
            series: lineData
        };
        return (
            <div
                style={{
                    width: "430px",
                    height: "300px"
                }}
            >
                <JSCharting options={config} mutable={true} />
            </div>
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
