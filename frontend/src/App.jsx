import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { taskAdded, taskUpdated, taskDeleted } from './store/taskSlice';

const SOCKET_URL = 'https://real-time-productivity-management-system-3q09.onrender.com';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) return;

    const socket = io(SOCKET_URL);

    socket.emit('join', user._id);

    socket.on('task_created', (task) => {
      if (task.user === user._id) dispatch(taskAdded(task));
    });

    socket.on('task_updated', (task) => {
      if (task.user === user._id) dispatch(taskUpdated(task));
    });

    socket.on('task_deleted', (data) => {
      if (data.user === user._id) dispatch(taskDeleted(data));
    });

    return () => {
      socket.disconnect();
    };
  }, [user, dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
