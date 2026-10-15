'use client';

// All leaflet imports live here. This file MUST only be loaded via
// next/dynamic({ ssr: false }) so it never enters the server bundle.

import { useEffect, useState } from 'react';
import L, { type DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

interface CompanyMapProps {
  center?: [number, number];
  markerPosition?: [number, number];
  popupText?: string;
  className?: string;
}

export default function CompanyMap({
  center = [40.725, -73.985],
  markerPosition = [40.724716, -73.984789],
  popupText = '430 E 6th St, New York, 10009.',
  className = 'rounded-xl w-full md:w-80 min-h-52',
}: CompanyMapProps) {
  const [customIcon, setCustomIcon] = useState<DivIcon | null>(null);

  useEffect(() => {
    setCustomIcon(
      L.divIcon({
        html: `<i class="ki-solid ki-geolocation text-3xl text-green-500"></i>`,
        className: 'leaflet-marker',
        bgPos: [10, 10],
        iconAnchor: [20, 37],
        popupAnchor: [0, -37],
      }),
    );
  }, []);

  return (
    <MapContainer center={center} zoom={30} className={className}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {customIcon && (
        <Marker position={markerPosition} icon={customIcon}>
          <Popup>{popupText}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
