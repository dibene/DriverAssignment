import React from "react"
import { DeliversAndDriversMap } from "./components/DeliversAndDriversMap/DeliversAndDriversMap"

// Sample data for delivery locations and drivers
const deliveryLocations = [
  {
    id: 1,
    lat: -34.921318,
    lng: -57.953415,
    assignedTo: 1,
    direction: "la plata calle 51 123456",
  },
  {
    id: 1,
    lat: -34.921318,
    lng: -57.9536,
    assignedTo: null,
    direction: "la plata calle 56 123456",
  },
  // i will add  more...
]

const drivers = [
  { id: 1, name: "Driver 1" },
  { id: 2, name: "Driver 2" },
  { id: 3, name: "Driver 3" },
  { id: 4, name: "Driver 4" },
  { id: 5, name: "Driver 5" },
]

export default function DriverAssignment() {
  return (
    <div>
      <h1>DriverAssigment</h1>
      <main>
        <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateRows: "min-content auto",
              height: "80vh",
            }}
          >
            <div style={{ display: "flex" }}>
              {drivers.map(driver => (
                <button>{driver.name}</button>
              ))}
            </div>
            <DeliversAndDriversMap />
          </div>
          <ul>
            {deliveryLocations.map(location => (
              <li>{location.direction}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
