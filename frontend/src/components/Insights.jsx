import { useMemo } from 'react';
import { CheckCircle, Clock, ListTodo, TrendingUp, Award, Zap } from 'lucide-react';

const Insights = ({ tasks }) => {
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    const pending = total - completed;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const todayCompleted = tasks.filter(t => 
      t.status === 'Completed' && 
      new Date(t.updatedAt) >= startOfDay
    ).length;

    const categories = {};
    tasks.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + 1;
    });

    let mostActiveCategory = 'None';
    let max = 0;
    for (const [cat, count] of Object.entries(categories)) {
      if (count > max) {
        max = count;
        mostActiveCategory = cat;
      }
    }

    return { total, completed, pending, todayCompleted, mostActiveCategory };
  }, [tasks]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-6 rounded-3xl text-center border-indigo-50 shadow-lg shadow-indigo-100">
          <ListTodo className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
          <p className="text-3xl font-black text-slate-900">{stats.total}</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Tasks</p>
        </div>
        <div className="glass p-6 rounded-3xl text-center border-emerald-50 shadow-lg shadow-emerald-100">
          <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
          <p className="text-3xl font-black text-slate-900">{stats.completed}</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Completed</p>
        </div>
        <div className="glass p-6 rounded-3xl text-center col-span-2 border-amber-50 shadow-lg shadow-amber-100">
          <Clock className="w-8 h-8 text-amber-600 mx-auto mb-3" />
          <p className="text-3xl font-black text-slate-900">{stats.pending}</p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pending Tasks</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border-2 border-indigo-50 shadow-xl shadow-indigo-50">
        <h4 className="font-black mb-4 flex items-center gap-2 text-indigo-600 text-lg tracking-tight">
          <Zap className="w-6 h-6 fill-indigo-600" /> Daily Highlights
        </h4>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-200"></span>
            <span className="text-sm font-semibold text-slate-600">
              Completed <strong className="text-slate-900">{stats.todayCompleted}</strong> tasks today
            </span>
          </li>
          <li className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="w-3 h-3 bg-indigo-500 rounded-full shadow-lg shadow-indigo-200"></span>
            <span className="text-sm font-semibold text-slate-600">
              Focus: <strong className="text-slate-900">"{stats.mostActiveCategory}"</strong>
            </span>
          </li>
          {stats.pending === 0 && stats.total > 0 && (
            <li className="flex items-center gap-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <Award className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-bold text-emerald-700">Perfect Day! All tasks cleared.</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Insights;
