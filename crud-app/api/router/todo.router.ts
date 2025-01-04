import { Router } from "express";
import { 
     addTodo, 
     completeTask, 
     deleteTodo, 
     editTodo, 
     fetchTodoById, 
     getAllTodos 
} from "../controller/todo.controller";

const userRouter = Router();

userRouter.post("/add-todo", addTodo);
userRouter.get("/get-all-todos", getAllTodos);
userRouter.delete("/delete-todo/:id", deleteTodo);
userRouter.put("/complete-todo", completeTask);
userRouter.get("/get-todo/:id", fetchTodoById);
userRouter.put("/edit-todo/:id", editTodo);

export default userRouter;