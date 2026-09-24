import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const QueryCard = ({ query, linkPrefix = '/user/queries' }) => {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono text-blue-600 font-semibold mb-1">{query.queryId}</p>
          <h3 className="font-semibold text-gray-900 truncate">{query.subject}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{query.description}</p>
        </div>
        <StatusBadge status={query.status} />
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-gray-400">{formatDate(query.createdAt)}</span>
        <Link
          to={`${linkPrefix}/${query._id}`}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View →
        </Link>
      </div>
    </div>
  );
};
export default QueryCard;
