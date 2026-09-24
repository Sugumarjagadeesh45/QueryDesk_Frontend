import React from 'react';

export const Input = React.forwardRef(({ className = '', icon: Icon, ...props }, ref) => {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-4 w-4 text-slate-400" />
        </div>
      )}
      <input
        ref={ref}
        className={`w-full h-10 px-3 ${Icon ? 'pl-9' : ''} bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-500 transition-colors ${className}`}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';
