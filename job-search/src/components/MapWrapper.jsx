import { Wrapper } from "@googlemaps/react-wrapper";
import { useContext, useRef, useState } from "react";
import JobResultContext from '../context/JobResultContext';
import Map from "./Map";

function MapWrapper() {
  const { jobResult } = useContext(JobResultContext);
  const { results } = jobResult;
  const center = {lat: results[0].latitude, lng: results[0].longitude};
  const zoom = 10;
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

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

  const [markerList, setMarkerList] = useState([]);


  return (
    <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={render}>
      {/* <Map 
        center={center} 
        zoom={zoom} 
        jobResult={jobResult} 
      /> */}
      <Map 
        center={center} 
        zoom={zoom} 
        // jobResult={jobResult} 
      />
    </Wrapper>
  )
}
export default MapWrapper
