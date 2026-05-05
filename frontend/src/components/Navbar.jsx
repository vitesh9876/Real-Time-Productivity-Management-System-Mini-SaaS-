import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/authSlice';
import { resetTasks } from '../store/taskSlice';
import { Zap } from 'lucide-react';

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
    <nav className="glass sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-indigo-600 tracking-tight">
          <Zap className="w-8 h-8 fill-indigo-600" />
          ProTasker
        </Link>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600 font-medium hidden md:block">Hi, {user.name}</span>
              <button 
                onClick={onLogout}
                className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-2 rounded-xl transition-all text-sm font-semibold border border-slate-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-6 flex items-center">
              <Link to="/login" className="text-slate-600 font-semibold hover:text-indigo-600 transition">Login</Link>
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition shadow-lg shadow-indigo-200 font-bold">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
