"use client";
const areaCoordinates = { Bole: [9.0108,38.7613], Kazanchis: [9.0227,38.7644], Megenagna: [9.0257,38.7976], Piassa: [9.0354,38.7524] };
export default function DeliveryMap({ area }) {
  const delivery = areaCoordinates[area] ?? areaCoordinates.Bole; const courier = [9.018,38.775]; const points = [courier,delivery];
  const lats = points.map(([lat]) => lat), lngs = points.map(([,lng]) => lng); const minLat = Math.min(...lats)-.004, maxLat = Math.max(...lats)+.004, minLng = Math.min(...lngs)-.004, maxLng = Math.max(...lngs)+.004;
  const position = ([lat,lng]) => ({ left: `${((lng-minLng)/(maxLng-minLng))*100}%`, top: `${(1-(lat-minLat)/(maxLat-minLat))*100}%` });
  return <figure className="delivery-map" aria-label={`Map showing courier and delivery in ${area}`}><div className="map-grid" aria-hidden="true" /><span className="map-marker courier-marker" style={position(courier)}>??</span><span className="map-marker delivery-marker" style={position(delivery)}>??</span><figcaption>Courier ? delivery in {area}; view fitted to both markers.</figcaption></figure>;
}
