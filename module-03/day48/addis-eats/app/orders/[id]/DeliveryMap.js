"use client";

export default function DeliveryMap({ courier, delivery }) {
  const mapUrl = `https://www.openstreetmap.org/?mlat=${delivery.lat}&mlon=${delivery.lng}#map=14/${delivery.lat}/${delivery.lng}`;
  return (
    <div className="delivery-map" role="img" aria-label={`Delivery map centered near ${delivery.address}`}>
      <p>Courier location: {courier.lat.toFixed(4)}, {courier.lng.toFixed(4)}</p>
      <p>Delivery address: {delivery.address}</p>
      <a href={mapUrl} target="_blank" rel="noreferrer">Open delivery area map</a>
    </div>
  );
}