import { useState, useEffect, useMemo } from 'react';
import FilterBar from './components/FilterBar';
import LogList from './components/LogList';
import { getLogs } from './services/api';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    level: '',
    resourceId: '',
    start: '',
    end: ''
  });
  const [loading, setLoading] = useState(false);

  // Debounce only the search text; other filters remain instant
  const debouncedSearch = useDebounce(filters.search, 400);

  // Build API params using debounced search
  const apiParams = useMemo(() => ({
    ...filters,
    search: debouncedSearch
  }), [filters, debouncedSearch]);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const data = await getLogs(apiParams);
        setLogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [apiParams]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold p-4">Log Query System</h1>
      <FilterBar onChange={setFilters} />
      {loading ? <p className="p-4">Loading...</p> : <LogList logs={logs} />}
    </div>
  );
}

export default App;
