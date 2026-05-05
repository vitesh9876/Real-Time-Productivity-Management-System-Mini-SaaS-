import { useMemo, useEffect, useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks }) => {
  const [now, setNow] = useState(new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date().getTime()), 60000); // update every min
    return () => clearInterval(interval);
  }, []);

  const sortedTasks = useMemo(() => {
    return [...tasks].map(task => {
      const deadlineTime = new Date(task.deadline).getTime();
      const timeDiff = deadlineTime - now;
      let priorityScore = 0;
      
      if (task.status === 'Completed') {
        priorityScore = -1000;
      } else if (timeDiff < 0) {
        // Overdue tasks have highest priority score
        priorityScore = 10000 + Math.abs(timeDiff) / 100000;
      } else {
        // Pending tasks, higher score as deadline approaches
        priorityScore = 1000 - (timeDiff / 1000000);
      }
      return { ...task, priorityScore, isOverdue: timeDiff < 0 && task.status !== 'Completed' };
    }).sort((a, b) => {
      if (b.priorityScore !== a.priorityScore) {
        return b.priorityScore - a.priorityScore;
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }, [tasks, now]);

  if (tasks.length === 0) return <p className="text-slate-400">No tasks found. Create one above!</p>;

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
