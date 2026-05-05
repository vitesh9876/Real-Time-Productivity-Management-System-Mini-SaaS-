import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../store/taskSlice';
import { format } from 'date-fns';
import { Trash2, AlertCircle, CheckCircle } from 'lucide-react';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    dispatch(updateTask({ id: task._id, data: { status: e.target.value } }));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  return (
    <div className={`p-4 rounded-xl border transition ${task.isOverdue ? 'bg-red-900/20 border-red-500/50' : 'bg-slate-800/50 border-slate-700'} ${task.status === 'Completed' ? 'opacity-70' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {task.title}
            {task.isOverdue && <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Overdue</span>}
            {task.status === 'Completed' && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Completed</span>}
          </h3>
          <p className="text-sm text-slate-400 mt-1">{task.description}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs text-indigo-400 font-medium px-2 py-1 bg-indigo-500/10 rounded-lg">
            Priority: {Math.round(task.priorityScore)}
          </span>
          <button onClick={handleDelete} className="text-red-400 hover:text-red-300 transition" title="Delete Task">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 text-sm text-slate-400">
        <div className="flex gap-4">
          <span><strong className="text-slate-300">Category:</strong> {task.category}</span>
          <span><strong className="text-slate-300">Deadline:</strong> {format(new Date(task.deadline), 'PPp')}</span>
        </div>
        <div>
          <select 
            value={task.status} 
            onChange={handleStatusChange}
            className="bg-slate-700 border border-slate-600 rounded px-2 py-1 focus:outline-none focus:border-indigo-500 text-white"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
