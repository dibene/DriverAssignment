import React, { ReactElement } from "react"
import { Status, Wrapper } from "@googlemaps/react-wrapper"
import { Map } from "./Map"
import { Marker } from "./Marker"
import { Location } from "../../DriverAssignment"
import { drivers } from "../../utils"

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
  const MAP_MARKER =
    "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"

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
            icon={{
              path: MAP_MARKER,
              scale: 1.4,
              fillColor:
                location.assignedTo != null
                  ? getDriverColor(location.assignedTo)
                  : "green",
              fillOpacity: 1,
              strokeColor: "black",
            }}
          />
        ))}
      </Map>
    </Wrapper>
  )
}

function getDriverColor(driverId: number): string {
  const driver = drivers.find(driver => driver.id === driverId)
  return driver?.color ?? "red"
}

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} the map...</h3>
  if (status === Status.FAILURE) return <h3>{status} to load the map.</h3>
  return <></>
}
