import React, { Component } from "react";
import { connect } from "react-redux";
import { Line, PolyLine, Circle } from "draw-shape-reactjs";

import Timeline from "../Timeline";
import BoatViewLineChart from './BoatViewLineChart';

class BoatView extends Component {
    lineMultiplier = varName => {
        const { selectedPoint, maxInDataSet } = this.props;
        return selectedPoint[varName] / maxInDataSet[varName];
    };

    createEllipse = (centerIn, variable) => {
        const { selectedPoint, maxInDataSet } = this.props;
        const divider = Math.ceil(32 * Math.abs(selectedPoint[variable] / maxInDataSet[variable]));
        const center = {...centerIn};
        const x = center.x;
        const y = center.y;
        let color = "";
        let points = [];
        if (variable === "zGyro") {
            points = this.createZEllipse(x, y, divider, selectedPoint[variable]);
            color = "green"
        } else if (variable === "xGyro") {
            points = this.createXEllipse(x, y, divider, selectedPoint[variable]);
            color = "orange"
        } else if (variable === "yGyro") {
            points = this.createYEllipse(x, y, divider, selectedPoint[variable]);
            color = "brown"
        }
        return(
            <div>
                <PolyLine 
                    position='fixed'
                    points={points}
                    lineWeight={2}
                    color={color}
                />
                <Circle
                    position="fixed"
                    center={points[points.length - 1]}
                    radius={2}
                    color={color}
                />
            </div>
        )
    }

    createZEllipse = (x, y, divider, value) => {
        let points = [];
        for (let i = 0; i < divider; i++) {
            const angle = value > 0 ? -Math.PI/2 + (Math.PI/64)*i : -Math.PI/2 - (Math.PI/64)*i;
            points.push([x + 50 * Math.cos(angle), y + 50 * Math.sin(angle)]);
        }
        return points;
    }

    createYEllipse = (x, y, divider, value) => {
        let points = [];
        for (let i = 0; i < divider; i++) {
            const angle = value > 0 ? -Math.PI + (Math.PI/64)*i : -Math.PI - (Math.PI/64)*i;
            points.push([x + 50 * Math.cos(angle), y + 50 * Math.sin(angle)]);
        }
        return points;
    }

    createXEllipse = (x, y, divider, value) => {
        let points = [];
        for (let i = 0; i < divider; i++) {
            const angle = value > 0 ? -Math.PI/2 - (Math.PI/64)*i : -Math.PI/2 + (Math.PI/64)*i;
            points.push([x + 50 * Math.cos(angle), y + 35 * Math.sin(angle)]);
        }
        return points;
    }

    colorSquare = (color) => (
        <div style={{ height: '10px', width: '10px', backgroundColor: color, margin: '5px 10px 0 0'}} />
    )

    createLegend = () => {
        const { selectedPoint } = this.props;
        return (
            <div className="boatViewLegend">
                <div className="legendValue">
                    {this.colorSquare('red')}
                    {"xAcc: " + selectedPoint["xAcc"]}
                </div>
                <div className="legendValue">
                    {this.colorSquare('blue')}
                    {"zAcc: " + selectedPoint["zAcc"]}
                </div>
                <div className="legendValue">
                    {this.colorSquare('green')}
                    {"zGyro: " + selectedPoint["zGyro"]}
                </div>
                <div className="legendValue">
                    {this.colorSquare('cyan')}
                    {"speed: " + selectedPoint["speed"]}
                </div>
                <div className="legendValue">
                    {this.colorSquare('purple')}
                    {"yAcc: " + selectedPoint["yAcc"]}
                </div>
                <div className="legendValue">
                    {this.colorSquare('orange')}
                    {"xGyro: " + selectedPoint["xGyro"]}
                </div>
                <div className="legendValue">
                    {this.colorSquare('brown')}
                    {"yGyro: " + selectedPoint["yGyro"]}
                </div>
            </div>
        )
    }

    render() {
        const xAcc = this.lineMultiplier("xAcc");
        const zAcc = this.lineMultiplier("zAcc");
        const yAcc = this.lineMultiplier("yAcc");
        const speed = this.lineMultiplier("speed");
        const zEllipse = this.createEllipse({ x: 248, y: 222}, "zGyro");
        const yEllipse = this.createEllipse({ x: 745, y: 222}, "yGyro");
        const xEllipse = this.createEllipse({ x: 745, y: 190}, "xGyro");
        return (
            <div className='boatViewContainer'>
                <div className='backAndTopView'>
                    <div
                        className='backView'
                        style={{
                            backgroundImage:
                                "url(" +
                                process.env.PUBLIC_URL +
                                "/TopBackBG/BackView.png)",
                            backgroundRepeat: "no-repeat"
                        }}
                    >
                        <Line
                            position='fixed'
                            from={[(xAcc > 0 ? 245 : 250), 222]}
                            to={[(xAcc > 0 ? 245 : 250) - Math.round(130 * xAcc), 222]}
                            color='red'
                            lineWeight={5}
                        />
                        <Line
                            position='fixed'
                            from={[248, (zAcc > 0 ? 220 : 222)]}
                            to={[248, (zAcc > 0 ? 222 : 222) - Math.round(130 * zAcc)]}
                            color='blue'
                            lineWeight={5}
                        />
                        { zEllipse }
                    </div>
                    <div
                        className='topView'
                        style={{
                            backgroundImage:
                                "url(" +
                                process.env.PUBLIC_URL +
                                "/TopBackBG/TopView.png)",
                            backgroundRepeat: "no-repeat"
                        }}
                    >
                        <Line
                            position='fixed'
                            from={[740, 220]}
                            to={[740 - Math.round(130 * speed), 220]}
                            color='cyan'
                            lineWeight={8}
                        />
                        <Line
                            position='fixed'
                            from={[(yAcc > 0 ? 743 : 748), 222]}
                            to={[(yAcc > 0 ? 743 : 748) - Math.round(130 * yAcc), 222]}
                            color='purple'
                            lineWeight={5}
                        />
                        { yEllipse }
                        { xEllipse }
                    </div>
                </div>
                {this.createLegend()}
                <div className='boatViewLineChart'>
                    <BoatViewLineChart/>
                </div>
                <Timeline withSpan={false} withPlayButtons={true} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.dataState.data,
    selectedPoint: state.dataState.selectedPoint,
    maxInDataSet: state.dataState.maxInDataSet,
    minInDataSet: state.dataState.minInDataSet,
    variables: state.variableState.variables
});

export default connect(mapStateToProps)(BoatView);
