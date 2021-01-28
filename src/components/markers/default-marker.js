import React from 'react'
import { Marker } from '@react-google-maps/api';

function DefaultMarker({ key, position, onClick }) {
    return (
        <Marker
            key={key}
            position={position}
            onClick={onClick}
        />
    )
}

export default DefaultMarker
