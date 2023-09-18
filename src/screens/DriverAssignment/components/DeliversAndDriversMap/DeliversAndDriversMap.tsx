import React, { ReactElement } from "react"
import { Status, Wrapper } from "@googlemaps/react-wrapper"
import { Map } from "./Map"
import { Marker } from "./Marker"
import { Location } from "../../DriverAssignment"

interface DeliversAndDriversMapProps {
  onClickLocation: (location: number) => void
  locations: Location[]
}

export function DeliversAndDriversMap({
  onClickLocation,
  locations,
}: DeliversAndDriversMapProps) {
  // for now i choose one, to improve it, i can calculate a average on all points in lat an lng
  const mapCenterPosition = { lat: locations[0].lat, lng: locations[0].lng }

  return (
    <Wrapper
      apiKey={process.env.REACT_APP_GOOGLE_API_KEY ?? ""}
      render={render}
    >
      <Map
        style={{ flexGrow: "1", height: "100%" }}
        center={mapCenterPosition}
        zoom={18}
      >
        {locations.map(location => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            onClick={() => onClickLocation(location.id)}
          />
        ))}
      </Map>
    </Wrapper>
  )
}

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} the map...</h3>
  if (status === Status.FAILURE) return <h3>{status} to load the map.</h3>
  return <></>
}
