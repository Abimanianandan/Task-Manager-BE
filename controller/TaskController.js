const Task = require("../model/TaskModel");

const TaskController = {
  create: async (req, res) => {
    try {
      const { taskname, name, description } = req.body;
      if (!taskname || !name || !description) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newTask = new Task({ taskname, name, description });
      await newTask.save();

      res.status(200).json({
        message: "Task created successfully",
        newTask,
        createdAt: newTask.createdAt.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        }),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllTask: async (req, res) => {
    try {
      const { status } = req.query;
      const query = {};

      if (status && status.toLowerCase() !== "all") {
        const formattedStatus =
          status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
        query.status = formattedStatus;
      }

      const allTask = await Task.find(query);

      const formattedTasks = allTask.map((task) => ({
        _id: task._id,
        taskname: task.taskname,
        name: task.name,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        }),
        updatedAt: task.updatedAt.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        }),
      }));

      res.status(200).json({ message: "All tasks", tasks: formattedTasks });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTaskById: async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json({ message: "Task found", task });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateTaskById: async (req, res) => {
    try {
      const taskId = req.params.id;
      const { name, taskname, description, status } = req.body;

      if (!name || !taskname || !description) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const updatedTask = await Task.findById(taskId);
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      updatedTask.name = name;
      updatedTask.taskname = taskname;
      updatedTask.description = description;
      if (status) updatedTask.status = status;

      await updatedTask.save();

      res.status(200).json({
        message: "Task updated successfully",
        updatedTask,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteTaskById: async (req, res) => {
    try {
      const taskId = req.params.id;
      const deleteTask = await Task.findByIdAndDelete(taskId);

      if (!deleteTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({
        message: "Task deleted successfully",
        deleteTask,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = TaskController;
