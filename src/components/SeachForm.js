import { useState } from 'react';

export default function SearchForm({ onSearch }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(from, to);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
      <input
        type="text"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="From (e.g. LGW)"
        className="px-4 py-2 border rounded-md w-full sm:w-40"
      />
      <input
        type="text"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To (e.g. JFK)"
        className="px-4 py-2 border rounded-md w-full sm:w-40"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
      >
        Search
      </button>
    </form>
  );
}
