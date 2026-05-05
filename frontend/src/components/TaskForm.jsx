import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../store/taskSlice';
import { PlusCircle, Calendar, Tag, FileText } from 'lucide-react';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    deadline: ''
  });
  const dispatch = useDispatch();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask(formData));
    setFormData({ title: '', description: '', category: 'General', deadline: '' });
  };

  return (
    <div className="glass p-10 rounded-[32px] border border-white shadow-2xl shadow-indigo-100 mb-10">
      <h3 className="text-3xl font-black mb-8 text-slate-900 tracking-tight flex items-center gap-3">
        <PlusCircle className="text-indigo-600 w-10 h-10" />
        Create New Task
      </h3>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
              <Tag className="w-4 h-4" /> Task Title
            </label>
            <input 
              type="text" name="title" value={formData.title} onChange={onChange} required
              placeholder="What needs to be done?"
              className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-slate-900 placeholder:text-slate-300 shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
              <Tag className="w-4 h-4" /> Category
            </label>
            <select 
              name="category" value={formData.category} onChange={onChange}
              className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-slate-900 shadow-sm"
            >
              <option value="General">General</option>
              <option value="Work">Work</option>
              <option value="Academic">Academic</option>
              <option value="Personal">Personal</option>
              <option value="Health">Health</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Description
          </label>
          <textarea 
            name="description" value={formData.description} onChange={onChange}
            placeholder="Add some details..."
            className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-slate-900 placeholder:text-slate-300 shadow-sm h-32 resize-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Deadline
          </label>
          <input 
            type="datetime-local" name="deadline" value={formData.deadline} onChange={onChange} required
            className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-slate-900 shadow-sm"
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-indigo-200 active:scale-95 flex items-center justify-center gap-3 text-lg">
          <PlusCircle className="w-6 h-6" /> Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
