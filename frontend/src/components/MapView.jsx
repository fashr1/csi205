import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ stations, center = [13.7563, 100.5018], zoom = 12 }) => {
  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ height: '500px', width: '100%' }}
      className="rounded-lg shadow-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map((station) => (
        <Marker 
          key={station.id} 
          position={[parseFloat(station.lat), parseFloat(station.lng)]}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg">{station.name}</h3>
              <p className="text-sm text-gray-600">{station.address}</p>
              <p className="text-sm mt-2">
                <span className="font-semibold">Available:</span> {station.available_slots}/{station.total_slots}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Price:</span> ฿{station.price_per_hour}/hour
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
