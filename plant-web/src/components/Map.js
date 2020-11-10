import React, { Component } from 'react';
// import logo from '../images/profile.svg';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import Geocode from 'react-geocode';

Geocode.setApiKey("AIzaSyA8CoWar_zEbimg-Kdi3O-kUsPvMJhXqBs");
class SimpleMap extends Component {
  state = {
    address: '',
    city: '',
    area: '',
    state: '',
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    }
  }

  onMarkerDragEnd = (e) => {
    let newLat = e.latLng.lat();
    let newLng = e.latLng.lng();

    Geocode.fromLatLng(newLat, newLng)
    .then(response => {
      console.log('response', response);
    })
    
  }
  render() {

    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      >
        <Marker
          draggable={true}
          onDragEnd={this.onMarkerDragEnd}
          position={{ lat: -34.397, lng: 150.644 }}
        >
          <InfoWindow>
            <div>
              hello
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    ));


    return (
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=Kvs39ZB1cLBYeQKS7&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default SimpleMap;