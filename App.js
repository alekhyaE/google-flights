import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BookingPage from './components/BookingPage';
import FlightCard from './components/FlightCard';
import FlightDetails from './components/FlightDetails';
import SearchBar from './components/SeachForm';

import mockResults from './flights.json';
function Home({ onSearch, results }) {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Search Flights</h1>
      <SearchBar onSearch={onSearch} />
      <div className="mt-6 space-y-6">
        {results.length > 0 ? (
          results.map((flight, idx) => <FlightCard key={idx} flight={flight} />)
        ) : (
          <p className="text-gray-500">No results.</p>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [results, setResults] = useState([]);

  const handleSearch = (from, to, date) => {
    const filtered = mockResults.data.itineraries.filter((flight) => {
      return flight.legs.some(
        (leg) =>
          leg.origin.displayCode.toLowerCase() === from.toLowerCase() &&
          leg.destination.displayCode.toLowerCase() === to.toLowerCase() 
      );
    });
    setResults(filtered);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home onSearch={handleSearch} results={results} />} />
        <Route path="/flight/:id" element={<FlightDetails />} />
        <Route path="/flight/:id/booking" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}
