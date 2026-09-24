import React from 'react';
import { LoaderCircle } from 'lucide-react';

export const Button = ({ children, variant = 'primary', size = 'md', isLoading, icon: Icon, className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 border border-transparent shadow-sm",
    secondary: "bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 shadow-sm",
    danger: "bg-red-600 text-white hover:bg-red-700 border border-transparent shadow-sm",
    dangerOutline: "bg-white text-red-600 hover:bg-red-50 border border-red-200 shadow-sm",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  };
  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10",
  };
  
  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? <LoaderCircle className="w-4 h-4 mr-2 animate-spin" /> : (Icon && children ? <Icon className="w-4 h-4 mr-2" /> : Icon ? <Icon className="w-4 h-4" /> : null)}
      {children}
    </button>
  );
};
