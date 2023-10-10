import express from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares";

import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller";

const router = express.Router();

router.post(
  "/create",
  [body("message").not().isEmpty().withMessage("Note can not be empty")],
  validateRequest,
  createTodo
);

router.delete("/:itemId", deleteTodo);

router.put("/:itemId", updateTodo);

router.get("/", getTodos);

export { router as todoRouter };
