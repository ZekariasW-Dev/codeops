"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
export default function DeliveryMap({ courier, delivery }) {
  return <MapContainer center={[courier.lat, courier.lng]} zoom={13} scrollWheelZoom={false} className="delivery-map">
    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker position={[courier.lat, courier.lng]}><Popup>Courier location</Popup></Marker>
    <Marker position={[delivery.lat, delivery.lng]}><Popup>Delivery address: {delivery.address}</Popup></Marker>
  </MapContainer>;
}
