import React from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import mapStyles from "../mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
    height: '50rem'
}
const center = {
    lat: 45.462504,
    lng: -73.554223
};
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

    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((event) => {
        setMarkers((current) => [
            ...current,
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date()
            }])
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
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.time.toISOString()}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: "map-marker-ski.png", //move this back to assets or move all assets to public
                            //scaledSize: new window.google.maps.Size(32, 32),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(16, 16)
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                    />
                ))}

                {selected ? (<InfoWindow
                    position={{ lat: selected.lat, lng: selected.lng }}
                    onCloseClick={() => {
                        setSelected(null);
                    }}
                >
                    <div>
                        <h2>Spotted</h2>
                        <p>{selected.time.toLocaleString()}</p>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    )
}

export default Map
