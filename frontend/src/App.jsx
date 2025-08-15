import { useState, useEffect, useMemo } from 'react';
import FilterBar from './components/FilterBar';
import LogList from './components/LogList';
import { getLogs } from './services/api';
import { useDebounce } from './hooks/useDebounce';
import { socket } from './services/socket';

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

  const debouncedSearch = useDebounce(filters.search, 400);

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

  // Helper to decide if a new log matches current filters
  function matchesFilters(log) {
    const { level, resourceId, start, end } = filters;
    const s = (filters.search || '').toLowerCase();

    if (level && log.level !== level) return false;
    if (resourceId && log.resourceId !== resourceId) return false;
    if (s && !(log.message || '').toLowerCase().includes(s)) return false;

    if (start) {
      const startTs = new Date(start).getTime();
      if (new Date(log.timestamp).getTime() < startTs) return false;
    }
    if (end) {
      const endTs = new Date(end).getTime();
      if (new Date(log.timestamp).getTime() > endTs) return false;
    }
    return true;
  }

  // Live updates
  useEffect(() => {
    const handler = (newLog) => {
      if (matchesFilters(newLog)) {
        // Prepend newest
        setLogs(prev => [newLog, ...prev]);
      }
    };
    socket.on('log:new', handler);
    return () => socket.off('log:new', handler);
  }, [filters]); // re-evaluate on filter change

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold p-4">Log Query System</h1>
      <FilterBar onChange={setFilters} />
      {loading ? <p className="p-4">Loading...</p> : <LogList logs={logs} />}
    </div>
  );
}

export default App;
