import React from 'react';

export const Select = React.forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={`h-10 px-3 pr-8 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none disabled:bg-slate-50 transition-colors ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: 'right 0.5rem center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1.5em 1.5em',
      }}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';
