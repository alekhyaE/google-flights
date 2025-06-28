import { Link } from 'react-router-dom';
const formatTime = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const formatDate = (iso) => new Date(iso).toLocaleDateString();


export default function FlightCard({ flight }) {
  const { price, legs, tags } = flight;

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 flex flex-col gap-4 w-full border">
      {legs.map((leg, index) => {
        const carrier = leg.carriers.marketing[0];
        return (
            <Link to={`/flight/${flight.id}`} className="block bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition border">
          <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-4 mb-4 last:border-none last:pb-0 last:mb-0">
            <img src={carrier.logoUrl} alt={carrier.name} className="w-10 h-10 object-contain" />
            <div className="flex-1 w-full">
              <div className="text-lg font-semibold">{carrier.name}</div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600 mt-1 gap-2">
                <div>
                  <div className="font-medium">{leg.origin.city} ({leg.origin.displayCode})</div>
                  <div>{formatDate(leg.departure)} · {formatTime(leg.departure)}</div>
                </div>
                <div className="text-center">
                  <div>🕓</div>
                  <div>{Math.floor(leg.durationInMinutes / 60)}h {leg.durationInMinutes % 60}m</div>
                  <div>{leg.stopCount === 0 ? 'Non-stop' : `${leg.stopCount} stop(s)`}</div>
                </div>
                <div>
                  <div className="font-medium">{leg.destination.city} ({leg.destination.displayCode})</div>
                  <div>{formatDate(leg.arrival)} · {formatTime(leg.arrival)}</div>
                </div>
              </div>
            </div>
          </div>
          </Link>
        );
      })}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-2">
        <div className="text-xl font-bold text-green-600">{price.formatted}</div>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, i) => (
            <span key={i} className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
