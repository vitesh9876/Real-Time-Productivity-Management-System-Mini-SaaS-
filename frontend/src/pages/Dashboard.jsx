import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from '../store/taskSlice';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Insights from '../components/Insights';

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="glass p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
          <TaskForm />
        </div>
        <div className="glass p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
          <TaskList tasks={tasks} />
        </div>
      </div>
      <div className="lg:col-span-1">
        <div className="glass p-6 rounded-2xl sticky top-24">
          <h2 className="text-2xl font-bold mb-4">Insights</h2>
          <Insights tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
