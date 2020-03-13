import React, { Component } from "react";
import { connect } from "react-redux";

import Loading from '../Loading';
import Map from './Map';

class BoatRoute extends Component {
    getAllPoints = (data) => {
        let list_of_points = []
        for (var i = 0; i < data.length; i++) {
            list_of_points.push([data[i].long, data[i].lat])
        }
        return list_of_points;
    }
    render() {
        const data = this.props.data
        if (data) {
            const coordinates = this.getAllPoints(data)
            const middlePoint = Math.round(coordinates.length / 4);
            return(
                <Map lat={coordinates[middlePoint][1]} long={coordinates[middlePoint][0]} coordinates={coordinates} />
            )
        } else {
            return(
                <Loading />
            )
        }
    }
}

const mapStateToProps = state => ({
    data: state.dataState.data
})

export default connect(mapStateToProps)(BoatRoute);