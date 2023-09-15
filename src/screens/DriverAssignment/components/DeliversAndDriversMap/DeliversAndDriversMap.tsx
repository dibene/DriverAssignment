import React, { ReactElement } from "react"
import { Status, Wrapper } from "@googlemaps/react-wrapper"
import { Map } from "./Map"
import { Marker } from "./Marker"

export function DeliversAndDriversMap() {
  // test position la plata
  const position: google.maps.LatLngLiteral = {
    lat: -34.921318,
    lng: -57.953415,
  }
  
  return (
    <Wrapper
      apiKey={process.env.REACT_APP_GOOGLE_API_KEY ?? ""}
      render={render}
    >
      <Map
        style={{ flexGrow: "1", height: "100%" }}
        center={position}
        zoom={18}
      >
        <Marker position={position} />
      </Map>
    </Wrapper>
  )
}

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>
  if (status === Status.FAILURE) return <h3>{status} ...</h3>
  return <></>
}
