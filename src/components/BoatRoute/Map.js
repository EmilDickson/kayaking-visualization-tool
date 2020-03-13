import React, { Component } from "react";
import MapGL, { Source, Layer } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import mapToken from './mapConfig';

class Map extends Component {
    data = {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: this.props.coordinates
        }
    }

    render() {
        return(
            <div className="mapContainer">
                <MapGL
                    style={{ width: '600px', height: '250px' }}
                    mapStyle="mapbox://styles/mapbox/light-v9"
                    accessToken={mapToken}
                    latitude={this.props.lat}
                    longitude={this.props.long}
                    zoom={17}
                >
                    <Source id="route" type="geojson" data={this.data} />
                    <Layer
                        id="route"
                        type="line"
                        source="route"
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round'
                        }}
                        paint={{
                        'line-color': '#888',
                        'line-width': 8
                        }}
                    />
                </MapGL>
            </div>
        )
    }
}

export default Map;
