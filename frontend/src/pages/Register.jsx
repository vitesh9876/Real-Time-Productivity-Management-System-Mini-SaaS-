import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerAction, reset } from '../store/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { name, email, password } = formData;
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
    dispatch(registerAction(formData));
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="glass p-10 rounded-3xl shadow-2xl shadow-indigo-100 border border-white">
        <h2 className="text-4xl font-black mb-8 text-center text-slate-900 tracking-tight">Join ProTasker</h2>
        {isError && <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium">{message}</div>}
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
            <input 
              type="text" name="name" value={name} onChange={onChange} required
              placeholder="John Doe"
              className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-slate-900 placeholder:text-slate-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
            <input 
              type="email" name="email" value={email} onChange={onChange} required
              placeholder="name@company.com"
              className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-slate-900 placeholder:text-slate-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
            <input 
              type="password" name="password" value={password} onChange={onChange} required
              placeholder="••••••••"
              className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-slate-900 placeholder:text-slate-300 shadow-sm"
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-200 active:scale-95">
            Create Account
          </button>
        </form>
        <p className="mt-8 text-center text-sm font-medium text-slate-500">
          Already a member? <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-bold underline underline-offset-4 decoration-2">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
