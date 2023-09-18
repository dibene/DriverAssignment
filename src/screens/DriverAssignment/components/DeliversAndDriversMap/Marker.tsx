import { useEffect, useState } from "react"

interface MarkerProps extends google.maps.MarkerOptions {
  style?: { [key: string]: string }
  onClick?: (e: google.maps.MapMouseEvent) => void
}

/** Marker bringin from google maps docs https://developers.google.com/maps/documentation/javascript/react-map  */
export function Marker({ onClick, style, ...options }: MarkerProps) {
  const [marker, setMarker] = useState<google.maps.Marker>()

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker())
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null)
      }
    }
  }, [marker])

  useEffect(() => {
    if (marker) {
      if (onClick) marker.addListener("click", onClick)
      marker.setOptions(options)
    }

    return () => {
      if (marker) {
        google.maps.event.clearInstanceListeners(marker)
      }
    }
  }, [marker, onClick, options])

  return null
}
