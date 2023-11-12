import { router } from ".";
import {
  createTodo,
  deleteAllTodo,
  deleteTodo,
  getAllTodo,
  updateTodo,
} from "../controllers/todo.controller";

router.get("/todo", getAllTodo);
router.post("/todo", createTodo);
router.put("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);
router.delete("/todo/", deleteAllTodo);

export default router;
