const Task = require("../model/TaskModel");

const TaskController = {
  
  create: async (req, res) => {
    try {
      const { taskname, name, description, deadline, subtask } = req.body;
      if (!taskname || !name || !description || !deadline || !subtask) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newTask = new Task({
        taskname,
        name,
        description,
        subtask,
        deadline: new Date(deadline),
      });
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
      allTask.forEach((task) => {
  console.log("DB subtask:", task.subtask);
});
      const formattedTasks = allTask.map((task) => ({
        _id: task._id,
        name: task.name,
        taskname: task.taskname,
        description: task.description,
        subtask:typeof task.subtask === "string" && task.subtask.trim() !== "" ? task.subtask : "N/A",
        status: task.status,
        deadline: task.deadline
          ? new Date(task.deadline).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })
          : "N/A",
        createdAt: task.createdAt.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        }),
        updatedAt: task.updatedAt.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        }),
      }));
      console.log(formattedTasks);
      res.status(200).json({ message: "All tasks", formattedTasks });
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
      const { name, taskname, description, status, subtask } = req.body;

      if (!name || !taskname || !description || !subtask) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const updatedTask = await Task.findById(taskId);
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      updatedTask.name = name;
      updatedTask.taskname = taskname;
      updatedTask.description = description;
      updatedTask.subtask = subtask;
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
