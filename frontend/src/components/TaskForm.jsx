import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../store/taskSlice';

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
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
          <input 
            type="text" name="title" value={formData.title} onChange={onChange} required
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
          <input 
            type="text" name="category" value={formData.category} onChange={onChange} required
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 text-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
        <textarea 
          name="description" value={formData.description} onChange={onChange} rows="2"
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">Deadline</label>
        <input 
          type="datetime-local" name="deadline" value={formData.deadline} onChange={onChange} required
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 text-white"
        />
      </div>
      <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
