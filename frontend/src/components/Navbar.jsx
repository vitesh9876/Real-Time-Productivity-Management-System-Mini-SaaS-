import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/authSlice';
import { resetTasks } from '../store/taskSlice';
import { CheckCircle } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetTasks());
    navigate('/login');
  };

  return (
    <nav className="glass sticky top-0 z-50 border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center gap-2 text-indigo-400">
          <CheckCircle className="w-6 h-6" />
          ProTasker
        </Link>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-300 hidden md:block">Welcome, {user.name}</span>
              <button 
                onClick={onLogout}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="text-slate-300 hover:text-white transition">Login</Link>
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
