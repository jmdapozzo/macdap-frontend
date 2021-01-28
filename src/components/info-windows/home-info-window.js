import React from 'react'
import { InfoWindow } from '@react-google-maps/api';

function HomeInfoWindow({ time, position, onCloseClick }) {
    return (
        <InfoWindow
        position={position}
        onCloseClick={onCloseClick}
    >
        <div>
            <h2>Home</h2>
            <p>{time.toLocaleString()}</p>
        </div>
    </InfoWindow>
    )
}

export default HomeInfoWindow
