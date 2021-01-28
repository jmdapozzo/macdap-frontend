import React from 'react'
import { GoogleMap, useLoadScript, InfoWindow } from '@react-google-maps/api';
import DefaultMarker from './markers/default-marker'
import SkiMarker from './markers/ski-marker'
import HomeMarker from './markers/home-marker'
import DefaultInfoWindow from './info-windows/default-info-window'
import SkiInfoWindow from './info-windows/ski-info-window'
import HomeInfoWindow from './info-windows/home-info-window'
import mapStyles from "../mapStyles";

const libraries = ["places"];

const mapContainerStyle = {
    height: '50rem'
}
const options = {
    //styles: mapStyles,
    disableDefaultUI: true,
    mapTypeControl: true,
    zoomControl: true
};

function Map() {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });

    const [currentPosition, setCurrentPosition] = React.useState({});
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const currentPositionSuccess = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setMarkers((current) => [
            ...current,
            {
                type: "home",
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                time: new Date()
            }]);

        setCurrentPosition(currentPosition);
    };

    const currentPositionError = error => {
        const currentPosition = {
            lat: 45.462504,
            lng: -73.554223
        }
        setCurrentPosition(currentPosition);
    };

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(currentPositionSuccess, currentPositionError);
    })

    const onMapClick = React.useCallback((event) => {
        setMarkers((current) => [
            ...current,
            {
                type: "ski",
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date()
            }]);
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";


    return (
        <div className="map_container">
            <h1 className="map-header">Ski <span role="img" aria-label="Snowflake">❄</span> </h1>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={currentPosition}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => {
                    var markerComponent;
                    switch (marker.type) {
                        case "home":
                            markerComponent =
                                <HomeMarker
                                    key={marker.time.toISOString()}
                                    position={{ lat: marker.lat, lng: marker.lng }}
                                    onClick={() => { setSelected(marker); }}
                                />
                            break;

                        case "ski":
                            markerComponent =
                                <SkiMarker
                                    key={marker.time.toISOString()}
                                    position={{ lat: marker.lat, lng: marker.lng }}
                                    onClick={() => { setSelected(marker); }}
                                />
                            break;

                        default:
                            markerComponent =
                                <DefaultMarker
                                    key={marker.time.toISOString()}
                                    position={{ lat: marker.lat, lng: marker.lng }}
                                    onClick={() => { setSelected(marker); }}
                                />
                    }
                    return markerComponent;
                }
                )}

                {selected ?
                    (() => {
                        var infoWindow;
                        switch (selected.type) {
                            case "home":
                                infoWindow =
                                    <HomeInfoWindow
                                        time={selected.time}
                                        position={{ lat: selected.lat, lng: selected.lng }}
                                        onCloseClick={() => { setSelected(null); }}
                                    />
                                break;

                            case "ski":
                                infoWindow =
                                    <SkiInfoWindow
                                        time={selected.time}
                                        position={{ lat: selected.lat, lng: selected.lng }}
                                        onCloseClick={() => { setSelected(null); }}
                                    />
                                break;

                            default:
                                infoWindow =
                                    <DefaultInfoWindow
                                        time={selected.time}
                                        position={{ lat: selected.lat, lng: selected.lng }}
                                        onCloseClick={() => { setSelected(null); }}
                                    />
                        }
                        return infoWindow
                    })()
                    : null
                }
            </GoogleMap>
        </div>
    )
}




export default Map
