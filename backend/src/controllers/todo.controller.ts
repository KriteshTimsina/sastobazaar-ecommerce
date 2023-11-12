import { ErrorRequestHandler, Request, Response } from "express";
import { Todo } from "../models/todo.model";
import expressAsyncHandler from "express-async-handler";

export const getAllTodo = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const todos = await Todo.find({});
      res.json({
        status: true,
        message: "All todos found",
        todos,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const createTodo = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { title, description } = req.body;
    try {
      const todos = await Todo.create({ title, description });
      res.json({
        status: true,
        message: "Todo Created",
        todos,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const updateTodo = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
      const todo = await Todo.findByIdAndUpdate(
        id,
        {
          title,
          description,
          isUpdated: true,
        },
        { new: true }
      );
      res.json({
        status: true,
        message: "Updation Successful",
        todo,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const deleteTodo = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const todo = await Todo.findByIdAndDelete(id);
      res.json({
        status: true,
        message: "Todo Deleted",
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
export const deleteAllTodo = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const todo = await Todo.deleteMany();
      if (todo) {
        res.json({
          status: true,
          message: "All Todos Deleted",
        });
      } else throw new Error("Error deleting todos");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
