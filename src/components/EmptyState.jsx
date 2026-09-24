import { MessageSquare } from 'lucide-react';

const EmptyState = ({ title = 'No data found', description = '', icon: Icon = MessageSquare }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="h-12 w-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-500 max-w-sm mx-auto">{description}</p>}
    </div>
  );
};
export default EmptyState;
