import { Link, useParams } from 'react-router-dom';
import mockResults from '../flights.json';

const formatTime = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const formatDate = (iso) => new Date(iso).toLocaleDateString();

export default function BookingPage() {
  const { id } = useParams();
  const flight = mockResults.data.itineraries.find(f => f.id === id);

  if (!flight) {
    return <p className="p-6 text-red-500">Flight not found.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
      <Link to={`/flight/${id}`} className="text-blue-600 underline mb-4 inline-block">← Back to Details</Link>
      <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>

      <div className="mb-6">
        <div className="text-lg font-semibold text-green-700">Price: {flight.price.formatted}</div>
        <div className="text-gray-600 mt-1">Fare includes taxes and fees. Cancellation/refund based on policy.</div>
      </div>

      {flight.legs.map((leg, idx) => {
        const carrier = leg.carriers.marketing[0];
        return (
          <div key={idx} className="border-b pb-4 mb-4 flex items-start gap-4">
            <img src={carrier.logoUrl} alt={carrier.name} className="w-12 h-12 object-contain mt-1" />
            <div>
              <div className="font-medium text-lg">{carrier.name}</div>
              <div className="text-sm text-gray-700">
                {leg.origin.city} ({leg.origin.displayCode}) → {leg.destination.city} ({leg.destination.displayCode})<br />
                {formatDate(leg.departure)} {formatTime(leg.departure)} → {formatDate(leg.arrival)} {formatTime(leg.arrival)}<br />
                Duration: {Math.floor(leg.durationInMinutes / 60)}h {leg.durationInMinutes % 60}m
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={() => alert("Booking confirmed!")}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Confirm Booking
      </button>
    </div>
  );
}
