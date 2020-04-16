import React, { Component } from "react";
import { connect } from "react-redux";
import { JSCharting } from "jscharting-react";
import { Dropdown } from "react-bootstrap";

class LineChartView extends Component {
    generateLineData = (chosenStart) => {
        const { minInDataSet, variables } = this.props;
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
        let data = [];
        if (chosenStart && minInDataSet) {
            for (let i = 0; i < variables.length; i++) {
                if (variables[i].active && variables[i].name !== "time") {
                    let elements = [];
                    for (
                        let j = 0, length = chosenStart.data.length;
                        j < length;
                        j++
                    ) {
                        elements.push({
                            y: chosenStart.data[j][variables[i].name],
                            x: chosenStart.data[j]["time"]
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

    render() {
        const { dataItems, chosenStartLineChart, setChosenStartLineChart } = this.props;
        const lineData = chosenStartLineChart ? this.generateLineData(dataItems[chosenStartLineChart - 1]) : null;
        const config = {
            type: "line",
            width: 850,
            height: 600,
            series: lineData,
            title_label_text: "Start no. " + chosenStartLineChart + " (all chosen variables in timespan)",
        };
        return (
            <div className='lineChartView'>
                <Dropdown>
                    <Dropdown.Toggle variant="info" id='lineChartChoiceButton'>
                        Choose start
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="lineChartChoiceMenu">
                        {dataItems.map(e => (
                            <Dropdown.Item key={"menu_start_item_" + e.id} onClick={() => setChosenStartLineChart(e.id)}>
                                {"Start no. " + e.id}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                {chosenStartLineChart ? (
                    <div
                    style={{
                        width: config.width,
                        height: config.height
                    }}
                    >
                        <JSCharting options={config} mutable={true} />
                    </div>
                ) : (
                    <div className="pleaseChooseMessage">
                        Please choose a start from the menu above.
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    minInDataSet: state.dataState.minInDataSet,
    minInDataSelection: state.dataState.minInDataSelection,
    dataItems: state.dataState.dataItems,
    variables: state.variableState.variables,
    chosenStartLineChart: state.logicState.chosenStartLineChart,
});

const mapDispatchToProps = dispatch => ({
    setChosenStartLineChart: dataItemId => dispatch({ type: "SET_CHOSEN_START_LINE_CHART", dataItemId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LineChartView);
