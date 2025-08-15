import { useState } from 'react';

export default function FilterBar({ onChange }) {
  const [filters, setFilters] = useState({
    search: '',
    level: '',
    resourceId: '',
    start: '',
    end: ''
  });

  function updateField(field, value) {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onChange(newFilters);
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md flex flex-wrap gap-4">
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
    </div>
  );
}
