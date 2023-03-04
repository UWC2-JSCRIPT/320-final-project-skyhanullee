import { Wrapper } from "@googlemaps/react-wrapper";
// import { useRef, useState } from "react";
import Map from "./Map";

function MapPage({ markerCoordinateArray }) {

  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  // console.log(GOOGLE_MAPS_API_KEY);

  // const map = new window.google.maps.Map(document.getElementById("map"));

  const center = { lat: 47.6062, lng: -122.3321 };
  const zoom = 13;

  const Status = {
    LOADING: 'LOADING',
    FAILURE: 'FAILURE',
    SUCCESS: 'SUCCESS',
  }

  const render = (status) => {
    // eslint-disable-next-line default-case
    switch (status) {
      case Status.LOADING:
        // return <Spinner />;
        return <h1>Loading</h1>
      case Status.FAILURE:
        // return <ErrorComponent />;
        return <h1>Error</h1>
      case Status.SUCCESS:
        return <Map />;
    }
  };

  return (
    <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={render}>
      <Map center={center} zoom={zoom} markerCoordinateArray={markerCoordinateArray} />
    </Wrapper>
  )
}
export default MapPage
