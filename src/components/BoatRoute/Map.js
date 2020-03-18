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
        const point = this.getPoint();
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
                    <Source id="point" type="geojson" data={point} />
                    <Layer
                        id="point"
                        type="circle"
                        source="point"
                        paint={{
                            "circle-color": "#123456"
                        }}
                    />
                </MapGL>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectedPoint: state.dataState.selectedPoint
});

export default connect(mapStateToProps)(Map);
