import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../store/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="glass p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>
        {isError && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4">{message}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
            <input 
              type="email" name="email" value={email} onChange={onChange} required
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
            <input 
              type="password" name="password" value={password} onChange={onChange} required
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition text-white"
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-400">
          Don't have an account? <Link to="/register" className="text-indigo-400 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
