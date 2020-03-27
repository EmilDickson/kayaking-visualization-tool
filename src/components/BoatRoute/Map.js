import React, { Component } from "react";
import MapGL, { Source, Layer } from "@urbica/react-map-gl";
import { connect } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";

import mapToken from "./mapConfig";

class Map extends Component {
    getRoute = () => ({
        type: "Feature",
        geometry: {
            type: "LineString",
            coordinates: this.props.coordinates
        }
    });

    getRouteHighlight = () => {
        const { dataSelection, long, lat } = this.props;
        return (dataSelection ? {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: dataSelection.map(data => [data.long, data.lat])
            }
        } : {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [long, lat]
            }
        });
    }

    getSpeedTail = () => {
        const { data, selectedPoint, maxInDataSet } = this.props;
        if (data && selectedPoint && maxInDataSet) {
            const selectedCoords = [selectedPoint.long, selectedPoint.lat];
            let uniqueCoords = [];
            let uniqueLat = [...new Set(data.map(item => item.lat))];
            let uniqueLong = [...new Set(data.map(item => item.long))];
            for (let i = 0; i < uniqueLat.length; i++) {
                uniqueCoords.push([uniqueLong[i], uniqueLat[i]])
            }
            const speedConstant = Math.round((selectedPoint.speed / maxInDataSet.speed) * 4);
            for (let i = 0; i < uniqueCoords.length; i++) {
                if (uniqueCoords[i][0] === selectedCoords[0] && uniqueCoords[i][1] === selectedCoords[1]) {
                    if (i > speedConstant) {
                        let lat1 = uniqueCoords[i - speedConstant][1];
                        let lat2 = selectedCoords[1];
                        let long1 = uniqueCoords[i - speedConstant][0];
                        let long2 = selectedCoords[0];
                        return {
                            type: "Feature",
                            geometry: {
                                type: "LineString",
                                coordinates: [[long1, lat1], [long2, lat2]]
                            }
                        };
                    }
                }
            }
        }
        return {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [this.props.long, this.props.lat]
            }
        }
    }

    getPoint = () => ({
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: this.props.selectedPoint
                ? [this.props.selectedPoint.long, this.props.selectedPoint.lat]
                : [this.props.long, this.props.lat]
        },
        properties: {
            name: "Current point"
        }
    });

    render() {
        const route = this.getRoute();
        const span = this.getRouteHighlight();
        const point = this.getPoint();
        const tail = this.getSpeedTail();
        return (
            <div className="mapContainer">
                <MapGL
                    style={{ width: "600px", height: "250px" }}
                    mapStyle="mapbox://styles/mapbox/light-v9"
                    accessToken={mapToken}
                    latitude={this.props.lat}
                    longitude={this.props.long}
                    zoom={17}
                >
                    {this.props.withRouteHighlight ? (<Source id="span" type="geojson" data={span} />) : null }
                    {this.props.withRouteHighlight ? (
                        <Layer 
                            id="span"
                            type="line"
                            source="span"
                            layout={{
                                "line-join": "round",
                                "line-cap": "round"
                            }}
                            paint={{
                                "line-color": "#88D140",
                                "line-width": 12
                            }}
                        />) : null}
                    <Source id="route" type="geojson" data={route} />
                    <Layer
                        id="route"
                        type="line"
                        source="route"
                        layout={{
                            "line-join": "round",
                            "line-cap": "round"
                        }}
                        paint={{
                            "line-color": "#001BFF",
                            "line-width": 4
                        }}
                    />
                    <Source id="tail" type="geojson" data={tail} />
                    <Layer 
                        id="tail"
                        type="line"
                        source="tail"
                        layout={{
                            "line-join": "round",
                            "line-cap": "round"
                        }}
                        paint={{
                            "line-color": "#0CADF5",
                            "line-width": 4
                        }}
                    />
                    <Source id="point" type="geojson" data={point} />
                    <Layer
                        id="point"
                        type="circle"
                        source="point"
                        paint={{
                            "circle-color": "black"
                        }}
                    />
                </MapGL>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectedPoint: state.dataState.selectedPoint,
    data: state.dataState.data,
    maxInDataSet: state.dataState.maxInDataSet,
    dataSelection: state.dataState.dataSelection,
});

export default connect(mapStateToProps)(Map);
