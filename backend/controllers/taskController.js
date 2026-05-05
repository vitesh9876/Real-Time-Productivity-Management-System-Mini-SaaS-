const Task = require('../models/Task');

// Function to calculate task priority based on deadlines
// Overdue tasks get higher priority, while upcoming tasks have lower priority
const calculatePriority = (task) => {
  const now = new Date();
  const deadline = new Date(task.deadline);
  const timeDiff = deadline.getTime() - now.getTime();
  
  if (task.status === 'Completed') return -1000; // Lowest priority for completed

  let priority = 0;
  if (timeDiff < 0) {
    // Overdue
    priority = 10000 + Math.abs(timeDiff) / 100000; 
  } else {
    // Pending
    priority = 1000 - (timeDiff / 1000000); 
  }
  return priority;
};

exports.getTasks = async (req, res) => {
  try {
    // Fetch tasks only for the logged-in user
    let tasks = await Task.find({ user: req.user._id }).lean();
    
    tasks = tasks.map(t => ({
      ...t,
      priorityScore: calculatePriority(t)
    }));

    // Sort by priority DESC, then by createdAt ASC (earlier created first)
    tasks.sort((a, b) => {
      if (b.priorityScore !== a.priorityScore) {
        return b.priorityScore - a.priorityScore;
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error in getTasks:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    // Create new task with the user ID from the auth middleware
    const task = await Task.create({
      ...req.body,
      user: req.user._id
    });
    
    const plainTask = task.toObject();
    plainTask.priorityScore = calculatePriority(plainTask);
    
    // Notify the user via socket for real-time update
    if (req.io) {
      const roomId = req.user._id.toString();
      req.io.to(roomId).emit('task_created', plainTask);
    }
    
    res.status(201).json(plainTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    ).lean();

    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    task.priorityScore = calculatePriority(task);
    
    if (req.io) {
      req.io.to(req.user._id.toString()).emit('task_updated', task);
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error in updateTask:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    if (req.io) {
      req.io.to(req.user._id.toString()).emit('task_deleted', { id: req.params.id, user: req.user._id });
    }
    
    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error('Error in deleteTask:', error);
    res.status(500).json({ message: error.message });
  }
};
