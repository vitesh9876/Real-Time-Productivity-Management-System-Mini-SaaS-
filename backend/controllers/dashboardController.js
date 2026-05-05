const Task = require('../models/Task');

exports.getInsights = async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await Task.find({ user: userId });
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const pendingTasks = tasks.filter(t => t.status !== 'Completed').length;

    // Daily activity count
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todayCompleted = tasks.filter(t => 
      t.status === 'Completed' && 
      new Date(t.updatedAt) >= startOfDay && 
      new Date(t.updatedAt) <= endOfDay
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

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      todayCompleted,
      mostActiveCategory,
      categories
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
