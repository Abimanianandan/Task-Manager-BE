const TaskController = require("../controller/TaskController");
// const isAuth = require("../middleware/IsAuth")
const express = require("express")
const taskRouter = express.Router();

taskRouter.post("/create",TaskController.create);
taskRouter.get("/allTask",TaskController.getAllTask);
taskRouter.get("/:id",TaskController.getTaskById);
taskRouter.put("/:id",TaskController.updateTaskById);
taskRouter.delete("/:id",TaskController.deleteTaskById);
module.exports = taskRouter;