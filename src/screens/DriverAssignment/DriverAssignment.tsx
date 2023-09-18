import React, { useState } from "react"
import { DeliversAndDriversMap } from "./components/DeliversAndDriversMap/DeliversAndDriversMap"
import { DriverSelector } from "./components/DriverSelector"

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
    id: 2,
    lat: -34.921318,
    lng: -57.9536,
    assignedTo: null,
    direction: "la plata calle 56 123456",
  },
  // i will add  more...
]

export const drivers = [
  { id: 1, name: "Driver 1", color: "pink" },
  { id: 2, name: "Driver 2", color: "lightblue" },
  { id: 3, name: "Driver 3", color: "yellow" },
  { id: 4, name: "Driver 4", color: "lightgreen" },
  { id: 5, name: "Driver 5", color: "violet" },
]
export interface Driver {
  id: number
  name: string
}
export interface Location {
  id: number
  lat: number
  lng: number
  assignedTo: number | null
  direction: string
}

export default function DriverAssignment() {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
  const [locations, setLocations] = useState<Location[]>(
    () => deliveryLocations
  )

  const avaiableLocations = locations.filter(
    location => location.assignedTo == null
  )

  const currentDriverLocations = locations.filter(
    location => location.assignedTo === selectedDriver?.id
  )

  return (
    <div>
      <h1>DriverAssigment</h1>
      <main
        style={{
          padding: "8px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateRows: "min-content auto",
              gap: "20px",
              height: "80vh",
            }}
          >
            <DriverSelector
              selectedDriver={selectedDriver}
              setSelectedDriver={setSelectedDriver}
            />

            <DeliversAndDriversMap
              locations={locations}
              onClickLocation={assignLocationDriver}
            />
          </div>

          <aside>
            <h2>Avaible locations</h2>
            <ul>
              {avaiableLocations.map(location => (
                <li key={location.id}>
                  {location.direction}{" "}
                  {selectedDriver != null && (
                    <button onClick={() => assignLocationDriver(location.id)}>
                      assign
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {selectedDriver != null && (
              <>
                <h2>Driver's locations</h2>
                {currentDriverLocations.length > 0 ? (
                  <ul>
                    {currentDriverLocations.map(location => (
                      <li key={location.id}>
                        {location.direction}{" "}
                        <button
                          onClick={() => removeLocationDriver(location.id)}
                        >
                          remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span style={{ marginLeft: "12px" }}>
                    Select locations on the map or on the Avaible locations list
                  </span>
                )}
              </>
            )}
          </aside>
        </div>
      </main>
    </div>
  )

  function assignLocationDriver(locationId: number) {
    console.log("locationId", locationId)

    if (selectedDriver != null) {
      setLocations(locations =>
        locations.map(locationI => {
          if (locationI.id === locationId) {
            return {
              ...locationI,
              assignedTo: selectedDriver.id,
            }
          } else {
            return locationI
          }
        })
      )
    }
  }

  function removeLocationDriver(locationId: number) {
    if (selectedDriver != null) {
      setLocations(locations =>
        locations.map(locationI => {
          if (locationI.id === locationId) {
            return {
              ...locationI,
              assignedTo: null,
            }
          } else {
            return locationI
          }
        })
      )
    }
  }
}
