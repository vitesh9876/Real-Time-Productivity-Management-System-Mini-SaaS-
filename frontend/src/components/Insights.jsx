import { useMemo } from 'react';
import { CheckCircle, Clock, ListTodo, TrendingUp, Award } from 'lucide-react';

const Insights = ({ tasks }) => {
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    const pending = total - completed;

    // Daily activity
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const todayCompleted = tasks.filter(t => 
      t.status === 'Completed' && 
      new Date(t.updatedAt) >= startOfDay
    ).length;

    // Category distribution
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
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
          <ListTodo className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-xs text-slate-400">Total Tasks</p>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
          <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{stats.completed}</p>
          <p className="text-xs text-slate-400">Completed</p>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center col-span-2">
          <Clock className="w-6 h-6 text-orange-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{stats.pending}</p>
          <p className="text-xs text-slate-400">Pending Tasks</p>
        </div>
      </div>

      <div className="bg-indigo-900/20 p-4 rounded-xl border border-indigo-500/30">
        <h4 className="font-semibold mb-3 flex items-center gap-2 text-indigo-300">
          <TrendingUp className="w-5 h-5" /> Productivity Highlights
        </h4>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5">●</span>
            <span>You have completed <strong className="text-white">{stats.todayCompleted}</strong> tasks today. Keep it up!</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">●</span>
            <span>Your most active category is <strong className="text-white">"{stats.mostActiveCategory}"</strong>.</span>
          </li>
          {stats.pending === 0 && stats.total > 0 && (
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5"><Award className="w-4 h-4"/></span>
              <span>Incredible! You have cleared all your pending tasks!</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Insights;
