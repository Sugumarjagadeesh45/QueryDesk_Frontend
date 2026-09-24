import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, LogOut, ShieldCheck, User as UserIcon, MessageSquareText } from 'lucide-react';
import { Button } from '../ui/Button';

const Header = ({ onMenuClick }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 h-16 shrink-0 flex items-center px-4 md:px-6">
      <div className="flex-1 flex items-center justify-between">
        
        {/* Mobile Menu Button & Logo */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="md:hidden text-slate-500 hover:text-slate-700 focus:outline-none p-1 -ml-1 rounded-md hover:bg-slate-50"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link
            to={isAdmin ? '/admin/dashboard' : '/user/dashboard'}
            className="flex items-center gap-2.5 font-bold text-slate-900 text-lg group"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
              <MessageSquareText className="w-5 h-5" />
            </div>
            <span className="tracking-tight hidden sm:block">QueryDesk</span>
          </Link>
        </div>

        {/* Right side - User Profile */}
        {user && (
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-slate-900 leading-tight">{user.name}</p>
                <div className="flex items-center justify-end gap-1 mt-0.5 text-xs text-slate-500 font-medium">
                  {isAdmin ? <ShieldCheck className="w-3 h-3 text-blue-600" /> : <UserIcon className="w-3 h-3 text-slate-400" />}
                  <span>{isAdmin ? 'Administrator' : 'User'}</span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm shadow-sm uppercase">
                {user.name?.charAt(0)}
              </div>
            </div>
            
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout} 
              icon={LogOut}
              className="text-slate-500 hover:text-slate-900 px-2 sm:px-3"
            >
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
