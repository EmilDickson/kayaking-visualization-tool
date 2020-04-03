import React, { Component } from 'react';
import { connect } from 'react-redux';
import AnyChart from "anychart-react";
import anychart from 'anychart';

import MiniChart from './MiniChart';


class RadarChartView extends Component {
    renderChartDataSeries = () => {
        const { dataItems, variables } = this.props;
        let dataSeries = [];
        for (let i = 0; i < variables.length; i++) {
            if (variables[i].active && variables[i].name !== "time") {
                let variableSeries = [variables[i].name];
                for (let j = 0; j < dataItems.length; j++) {
                    const dataItem = {...dataItems[j]}
                    if (dataItem.active) {
                        const dataMax = dataItem.maxInDataSelection[variables[i].name];
                        const divider = dataMax !== 0 ? Math.abs(dataMax) : 1;
                        variableSeries.push(dataItem.selectedPoint[variables[i].name] / divider);
                    }
                }
                dataSeries.push(variableSeries);
            }
        }
        return dataSeries;
    }

    renderChart = () => {
        const { dataItems } = this.props;
        let chartHeader = dataItems.map(item => "Start no." + item.id);
        chartHeader.unshift("#");
        const chartDataSeries = this.renderChartDataSeries();
        const chartData = {
            title: 'Chosen start instances\n(values relative to max value in selection)',
            header: chartHeader,
            rows: chartDataSeries,
        };
        // create radar chart
        let chart = anychart.radar();
        // set default series type
        chart.defaultSeriesType('area');
        // set chart data
        chart.data(chartData);
        // force chart to stack values by Y scale.
        chart.yScale().stackMode('value');
        // set yAxis settings
        chart.yAxis().stroke('#545f69');
        chart.yAxis().ticks().stroke('#545f69');
        // set yAxis labels settings
        chart.yAxis().labels()
                .fontColor('#545f69')
                .format('{%Value}{scale:(1000000)|(M)}');
        // set chart legend settings
        chart.legend()
                .align('center')
                .position('center-bottom')
                .enabled(true);
        return chart;
    }

    createMiniGraphs = () => {
        const { dataItems } = this.props;
        let miniGraphs = [];
        for ( let i = 0; i < dataItems.length; i++) {
            if (dataItems[i].active) {
                miniGraphs.push(<MiniChart dataItem={dataItems[i]} key={"miniGraph_" + dataItems[i].id} />);
            }
        }
        return miniGraphs;
    }

    render() {
        const chart = this.renderChart();
        /* const miniGraphs = this.createMiniGraphs(); */
        return(
            <div className="radarChartView">
                <AnyChart 
                    width={430}
                    height={600}
                    instance={chart} 
                />
                <div className="spanView">
                    {"miniGraphs placeholder"}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    dataItems: state.dataState.dataItems,
    variables: state.variableState.variables,
})

export default connect(mapStateToProps)(RadarChartView);