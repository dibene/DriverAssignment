import React from "react"
import { Driver } from "../DriverAssignment"
import { drivers } from "../utils"

interface DriverSelectorProps {
  selectedDriver: Driver | null
  setSelectedDriver: React.Dispatch<React.SetStateAction<Driver | null>>
}
export function DriverSelector({
  selectedDriver,
  setSelectedDriver,
}: DriverSelectorProps) {
  return (
    <div>
      <h2>
        {selectedDriver != null ? (
          <span style={{ display: "flex", gap: "8px",alignItems: "center" }}>
            {selectedDriver.name}{" "}
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: selectedDriver.color,
              }}
            />
          </span>
        ) : (
          <>First select a driver.</>
        )}
      </h2>

      <div style={{ display: "flex", gap: "8px" }}>
        {drivers.map(driver => (
          <button
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
            key={driver.id}
            onClick={() => setSelectedDriver(driver)}
          >
            {driver.name}
            {/* color icon */}
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: driver.color,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
