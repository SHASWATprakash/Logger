import { useState } from 'react';

const EMPTY = { search: '', level: '', resourceId: '', start: '', end: '' };

export default function FilterBar({ onChange }) {
  const [filters, setFilters] = useState(EMPTY);

  function updateField(field, value) {
    const next = { ...filters, [field]: value };
    setFilters(next);
    onChange(next);
  }

  function clearAll() {
    setFilters(EMPTY);
    onChange(EMPTY);
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md flex flex-wrap gap-4 items-center">
      <input
        type="text"
        placeholder="Search message"
        value={filters.search}
        onChange={e => updateField('search', e.target.value)}
        className="border p-2 rounded"
      />
      <select
        value={filters.level}
        onChange={e => updateField('level', e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Levels</option>
        <option value="error">Error</option>
        <option value="warn">Warn</option>
        <option value="info">Info</option>
        <option value="debug">Debug</option>
      </select>
      <input
        type="text"
        placeholder="Resource ID"
        value={filters.resourceId}
        onChange={e => updateField('resourceId', e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="datetime-local"
        value={filters.start}
        onChange={e => updateField('start', e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="datetime-local"
        value={filters.end}
        onChange={e => updateField('end', e.target.value)}
        className="border p-2 rounded"
      />

      <button
        type="button"
        onClick={clearAll}
        className="border px-3 py-2 rounded bg-white hover:bg-gray-50"
      >
        Clear filters
      </button>
    </div>
  );
}
