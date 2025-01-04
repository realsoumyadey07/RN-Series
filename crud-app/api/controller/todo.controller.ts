import { NextFunction, Request, Response } from "express";
import { TodoModel } from "../model/todo.model";
import mongoose from "mongoose";

export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.body;

    // Validate title
    if (!title) {
      return next(
        res.status(400).json({
          message: "Title is required",
        })
      );
    }

    // Create new todo
    const todo = await TodoModel.create({ title });

    // Check if the creation was successful
    if (!todo) {
      return next(
        res.status(400).json({
          message: "Something went wrong!",
        })
      );
    }

    // Success response
    return next(
      res.status(200).json({
        success: true,
        message: "Todo successfully created!",
      })
    );
  } catch (error: any) {
    console.log("Error while adding todo:", error.message);

    // Pass the error to the next middleware
    next(error);
  }
};

export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await TodoModel.find();
    if (!todos) {
      return next(
        res.status(400).json({
          success: false,
          message: "Todo not found!",
        })
      );
    }
    return next(
      res.status(200).json({
        success: true,
        data: todos,
      })
    );
  } catch (error: any) {
    console.log("Error while getting todos: ", error.message);
  }
};


export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    if(!id) {
      return next(res.status(400).json({
        success: false,
        message: "Cannot delete the todo!"
      }));
    }
    const todo = await TodoModel.findById(id);
    if(!todo){
      return next(res.status(400).json({
        success: false,
        message: "Todo not found!"
      }));
    }
    await TodoModel.findByIdAndDelete(id);
    return next(res.status(200).json({
      success: true,
      message: "Todo deleted successfully!"
    }))
  } catch (error: any) {
    return next(res.status(500).json({
      success: false,
      message: error.message
    }))
  }
}

export const completeTask = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {id, completed} = req.body;
    const todo = await TodoModel.findById(id);
    if(!todo){
      return next(res.status(400).json({
        success: false,
        message: "Todo not found!"
      }));
    }
    const taskCompleted = await TodoModel.findByIdAndUpdate(id, {completed}, {new: true});
    if(!taskCompleted){
      return next(res.status(400).json({
        success: false,
        message: "Something went wrong!"
      }))
    }
    if(taskCompleted.completed === true){
      return next(res.status(200).json({
        success: true,
        message: "Todo marked as completed!"
      }))
    } else {
      return next(res.status(200).json({
        success: true,
        message: "Todo marked as not completed!"
      }))
    }
    
  } catch (error: any) {
    return next(res.status(500).json({
      success: false,
      message: error.message
    }))
  }
}

export const fetchTodoById = async (req: Request, res: Response, next: NextFunction)=> {
  try {
    const {id} = req.params;
    if(!id) return next(res.status(404).json({
      success: false,
      message: "Id is required!"
    }));
    const todo = await TodoModel.findById(id);
    if(!todo) return next(res.status(400).json({
      success: false,
      message: "Todo not found!"
    }));
    return next(res.status(200).json({
      success: true,
      todo,
      message: "Todo fetched successfully!"
    }));
  } catch (error: any) {
    return next(res.status(500).json({
      success: false,
      message: error.message
    }))
  }
}

export const editTodo = async(req: Request, res: Response, next: NextFunction)=> {
  try {
    const {title} = req.body;
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return next(res.status(400).json({
      success: false,
      message: "Invalid id!"
    }))
    if(!id && !title) return next(res.status(400).json({
      success: false,
      message: "Title and id both are required!"
    }));
    const todo = await TodoModel.findByIdAndUpdate(id, {title}, {new: true});
    if(!todo){
      return next(res.status(400).json({
        success: false,
        message: "Todo not found!"
      }));
    }
    return next(res.status(200).json({
      success: true,
      message: "Todo updated successfully!"
    }));
  } catch (error: any) {
    return next(res.status(500).json({
      success: false,
      message: error.message
    }))
  }
}