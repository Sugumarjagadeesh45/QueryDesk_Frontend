import { LoaderCircle } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <LoaderCircle className={`${sizes[size]} animate-spin text-blue-600`} />
      {text && <p className="mt-3 text-sm font-medium text-slate-500">{text}</p>}
    </div>
  );
};
export default LoadingSpinner;
