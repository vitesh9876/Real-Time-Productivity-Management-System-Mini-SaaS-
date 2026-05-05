import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from '../store/taskSlice';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Insights from '../components/Insights';
import { LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (user) {
      dispatch(getTasks());
    }
  }, [user, dispatch]);

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <LayoutDashboard className="w-10 h-10 text-indigo-600" />
            Dashboard
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage your tasks and track your productivity real-time.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <TaskForm />
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight ml-2">Your Task Stream</h2>
            <TaskList tasks={tasks} />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight ml-2">Productivity Feed</h2>
            <Insights tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
