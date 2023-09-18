import React, { useState } from "react"
import { DeliversAndDriversMap } from "./components/DeliversAndDriversMap/DeliversAndDriversMap"
import { DriverSelector } from "./components/DriverSelector"
import { deliveryLocations } from "./utils"

export interface Driver {
  id: number
  name: string
  color: string
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
            <h2 style={{ display: "flex", gap: "8px",alignItems: "center" }}>
              Avaible locations{" "}
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "green",
                }}
              />
            </h2>
            <ul>
              {avaiableLocations.map(location => (
                <li key={location.id} style={{padding:"4px"}}>
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
                      <li key={location.id} style={{padding:"4px"}}>
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
