const TaskController = require("../controller/TaskController");
const isAuth = require("../middleware/IsAuth")
const express = require("express")
const taskRouter = express.Router();

taskRouter.post("/create",isAuth,TaskController.create);
taskRouter.get("/allTask",TaskController.getAllTask);
taskRouter.get("/:id",TaskController.getTaskById);
taskRouter.put("/:id",TaskController.updateTaskById);
taskRouter.delete("/:id",isAuth,TaskController.deleteTaskById);
module.exports = taskRouter;