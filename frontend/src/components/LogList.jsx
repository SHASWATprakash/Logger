import dayjs from 'dayjs';

export default function LogList({ logs }) {
  if (!logs.length) {
    return <p className="p-4 text-gray-500">No logs found</p>;
  }

  return (
    <div className="p-4">
      {logs.map((log, i) => (
        <div
          key={i}
          className={`border-l-4 p-3 mb-2 bg-white shadow rounded 
            ${log.level === 'error' ? 'border-red-500 bg-red-50' :
              log.level === 'warn' ? 'border-yellow-500 bg-yellow-50' :
              log.level === 'info' ? 'border-blue-500 bg-blue-50' :
              'border-gray-300'}`}
        >
          <div className="flex justify-between">
            <span className="font-semibold">{log.level.toUpperCase()}</span>
            <span className="text-sm text-gray-500">{dayjs(log.timestamp).format('YYYY-MM-DD HH:mm:ss')}</span>
          </div>
          <p className="mt-1">{log.message}</p>
          <p className="text-sm text-gray-600">Resource: {log.resourceId}</p>
        </div>
      ))}
    </div>
  );
}
