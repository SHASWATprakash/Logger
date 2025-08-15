import { useState, useEffect } from 'react';
import FilterBar from './components/FilterBar';
import LogList from './components/LogList';
import { getLogs } from './services/api';

function App() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const data = await getLogs(filters);
        setLogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [filters]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold p-4">Log Query System</h1>
      <FilterBar onChange={setFilters} />
      {loading ? <p className="p-4">Loading...</p> : <LogList logs={logs} />}
    </div>
  );
}

export default App;
