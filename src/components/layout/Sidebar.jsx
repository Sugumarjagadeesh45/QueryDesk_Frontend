import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, ClipboardList, PenSquare, X } from 'lucide-react';

const UserLinks = [
  { to: '/user/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/user/queries', label: 'My Queries', icon: ClipboardList },
  { to: '/user/queries/new', label: 'New Query', icon: PenSquare },
];

const AdminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/queries', label: 'All Queries', icon: ClipboardList },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const links = isAdmin ? AdminLinks : UserLinks;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Mobile Close Button Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 md:hidden">
            <span className="font-semibold text-slate-900">Menu</span>
            <button 
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto mt-2">
            {links.map((link) => {
              const Icon = link.icon;
              
              // Custom active state logic to prevent "My Queries" from highlighting when on "New Query"
              let isActive = false;
              if (link.to === '/user/queries') {
                isActive = location.pathname === '/user/queries' || (location.pathname.startsWith('/user/queries/') && location.pathname !== '/user/queries/new');
              } else if (link.to === '/admin/queries') {
                isActive = location.pathname === '/admin/queries' || location.pathname.startsWith('/admin/queries/');
              } else {
                isActive = location.pathname === link.to;
              }

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => {
                    // Close sidebar on mobile when a link is clicked
                    if (window.innerWidth < 768) {
                      onClose();
                    }
                  }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1 h-5 bg-blue-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
