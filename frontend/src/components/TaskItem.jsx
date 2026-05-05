import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../store/taskSlice';
import { format } from 'date-fns';
import { Trash2, AlertCircle, CheckCircle2, Clock, Tag } from 'lucide-react';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    dispatch(updateTask({ id: task._id, data: { status: e.target.value } }));
  };

  const handleDelete = () => {
    if (window.confirm('Delete this task?')) {
      dispatch(deleteTask(task._id));
    }
  };

  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Completed';

  return (
    <div className={`glass p-6 rounded-[28px] border transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-50 group ${isOverdue ? 'bg-red-50/50 border-red-100 shadow-red-50' : 'bg-white border-slate-100'} ${task.status === 'Completed' ? 'opacity-80 scale-[0.98]' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className={`text-xl font-black tracking-tight ${task.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
              {task.title}
            </h3>
            {isOverdue && (
              <span className="text-[10px] bg-red-600 text-white px-3 py-1 rounded-full font-black uppercase tracking-tighter flex items-center gap-1 animate-pulse">
                <AlertCircle className="w-3 h-3" /> Overdue
              </span>
            )}
            {task.status === 'Completed' && (
              <span className="text-[10px] bg-emerald-600 text-white px-3 py-1 rounded-full font-black uppercase tracking-tighter flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Done
              </span>
            )}
          </div>
          <p className={`text-sm font-medium ${task.status === 'Completed' ? 'text-slate-400' : 'text-slate-600'}`}>
            {task.description}
          </p>
        </div>
        <button 
          onClick={handleDelete} 
          className="p-2.5 rounded-xl bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white"
          title="Delete Task"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-50">
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
            <Tag className="w-3.5 h-3.5 text-indigo-600" />
            {task.category}
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isOverdue ? 'bg-red-100 text-red-600' : 'bg-slate-100'}`}>
            <Clock className={`w-3.5 h-3.5 ${isOverdue ? 'text-red-600' : 'text-amber-600'}`} />
            {format(new Date(task.deadline), 'MMM d, h:mm a')}
          </div>
        </div>
        
        <div className="relative">
          <select 
            value={task.status} 
            onChange={handleStatusChange}
            className={`appearance-none font-bold text-xs px-6 py-2.5 rounded-2xl border-2 transition-all cursor-pointer focus:outline-none ring-offset-2 focus:ring-2
              ${task.status === 'Completed' ? 'bg-emerald-50 border-emerald-100 text-emerald-700 focus:ring-emerald-200' : 
                task.status === 'In Progress' ? 'bg-indigo-50 border-indigo-100 text-indigo-700 focus:ring-indigo-200' : 
                'bg-slate-50 border-slate-100 text-slate-700 focus:ring-slate-200'}`}
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
