import React, {Component} from 'react';
import {ParallelCoordinates} from 'react-parcoords';
import { connect } from "react-redux";

class ParCoords extends Component {
    getDimensions = () => {
        const allVars = this.props.variables;
        let activeVars = {};
        for (let i = 0; i < allVars.length; i++) {
            if (allVars[i].active && allVars[i].name !== 'time' && allVars[i].name !== 'fpaddling') {
                activeVars[allVars[i].name] = {
                    'title': allVars[i].name,
                    'type': 'number'
                }
            }
        }
        return activeVars;
    }

    getConfiguration = (dimensions) => ({
        color: "#123456",
        width: 950,
        height: 550,
        dimensions: dimensions,
        data: this.props.dataSelection ? this.props.dataSelection : this.props.data,
        highlights: [this.props.selectedPoint ? this.props.selectedPoint : this.props.data[450]],
        nullValueSeparator: 'top',
        brushedColor: null
    });

    render() {
        const dimensions = this.getDimensions();
        const configuration = this.getConfiguration(dimensions);
        return (
            <div className="parCoordsContainer">
                <ParallelCoordinates {...configuration} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.dataState.data,
    dataSelection: state.dataState.dataSelection,
    selectedPoint: state.dataState.selectedPoint,
    variables: state.variableState.variables,
})

export default connect(mapStateToProps)(ParCoords)