import { Link, useParams } from 'react-router-dom';
import mockResults from '../flights.json';

const formatTime = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const formatDate = (iso) => new Date(iso).toLocaleDateString();

export default function FlightDetails() {
  const { id } = useParams();
  const flight = mockResults.data.itineraries.find(f => f.id === id);

  if (!flight) {
    return <p className="p-6 text-red-500">Flight not found.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">← Back to Search</Link>
      <h2 className="text-2xl font-bold mb-4">Flight Details</h2>
      <div className="text-green-600 text-xl font-semibold mb-2">{flight.price.formatted}</div>
      {flight.legs.map((leg, idx) => (
        <div key={idx} className="border-b pb-4 mb-4">
          <div className="text-lg font-semibold">{leg.carriers.marketing[0].name}</div>
          <div className="text-sm text-gray-700">
            {leg.origin.city} ({leg.origin.displayCode}) → {leg.destination.city} ({leg.destination.displayCode})<br/>
            {formatDate(leg.departure)} {formatTime(leg.departure)} → {formatDate(leg.arrival)} {formatTime(leg.arrival)}<br/>
            Duration: {Math.floor(leg.durationInMinutes / 60)}h {leg.durationInMinutes % 60}m<br/>
            Stops: {leg.stopCount}
          </div>
        </div>
      ))}
      <div className="mt-2">
        <span className="font-medium">Tags: </span>
        {flight.tags.map(tag => (
          <span key={tag} className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full mr-2">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6">
  <Link
    to={`/flight/${flight.id}/booking`}
    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
  >
    Book Now
  </Link>
</div>
    </div>
  );
}
