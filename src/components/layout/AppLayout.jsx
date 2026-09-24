import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const AppLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
