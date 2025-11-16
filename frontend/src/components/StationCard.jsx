import { useNavigate } from 'react-router-dom';

const StationCard = ({ station }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{station.name}</h3>
      <p className="text-gray-600 mb-4">{station.address}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Available Slots:</span>
          <span className="font-semibold text-green-600">
            {station.available_slots} / {station.total_slots}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Price:</span>
          <span className="font-semibold text-blue-600">
            ฿{station.price_per_hour}/hour
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Status:</span>
          <span className={`px-2 py-1 rounded text-sm font-medium ${
            station.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {station.status}
          </span>
        </div>
      </div>

      {station.amenities && station.amenities.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Amenities:</p>
          <div className="flex flex-wrap gap-2">
            {station.amenities.map((amenity, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => navigate(`/booking/${station.id}`)}
        disabled={station.status !== 'active' || station.available_slots === 0}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {station.available_slots === 0 ? 'Fully Booked' : 'Book Now'}
      </button>
    </div>
  );
};

export default StationCard;
