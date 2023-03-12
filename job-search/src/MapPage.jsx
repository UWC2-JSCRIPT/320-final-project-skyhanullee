import { Wrapper } from "@googlemaps/react-wrapper";
// import { useRef, useState } from "react";
import Marker from "./Marker";

function MapPage({ jobResult }) {

  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  // console.log(GOOGLE_MAPS_API_KEY);

  const { results } = jobResult;

  // const map = new window.google.maps.Map(document.getElementById("map"));

  // const center = { lat: 47.6062, lng: -122.3321 };
  const center = {lat: results[0].latitude, lng: results[0].longitude};
  const zoom = 10;

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
        return <Marker />;
    }
  };

  return (
    <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={render}>
      <Marker 
        center={center} 
        zoom={zoom} 
        jobResult={jobResult} 
      />
    </Wrapper>
  )
}
export default MapPage
