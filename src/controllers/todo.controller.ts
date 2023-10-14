import { Request, Response } from "express";
import { NotFoundError } from "../errors";
import { Todo } from "../models/todo.model";

export const createTodo = async (req: Request, res: Response) => {
  const { message } = req.body;
  const todo = Todo.build({ message, userId: req.currentUser!.id });
  await todo.save();
  res.status(201).send({
    code: 201,
    message: "Successfully created the required todo item.",
    data: todo,
  });
};

export const deleteTodo = async (req: Request, res: Response) => {
  const itemId = req.params.itemId;

  const todo = await Todo.findById(itemId);

  if (!todo) throw new NotFoundError();

  await Todo.findByIdAndDelete(itemId);

  res.status(200).send({
    code: 200,
    message: "Successfully deleted the required todo item.",
  });
};

export const updateTodo = async (req: Request, res: Response) => {
  const itemId = req.params.itemId;
  const todo = await Todo.findById(itemId);

  if (!todo) throw new NotFoundError();

  todo.completed = !todo.completed;
  await todo.save();

  res.status(200).send({
    code: 200,
    message: "Successfully updated the required todo item.",
    data: todo,
  });
};

export const getTodos = async (req: Request, res: Response) => {
  const todos = await Todo.find({});
  todos.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  res.status(200).send({
    code: 200,
    message: "Found the requested todos from the selected page",
    data: {
      page: 1,
      limit: 10,
      totalPages: 1,
      todos,
    },
  });
};
