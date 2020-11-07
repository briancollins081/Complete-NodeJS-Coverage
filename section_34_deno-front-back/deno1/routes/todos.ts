import { Router } from "https://deno.land/x/oak/mod.ts";

import { ObjectId } from "https://deno.land/x/mongo@v0.13.0/mod.ts";

import { getDB, TodosSchema } from "../helpers/db.ts";

const router = new Router();

interface Todo {
  id?: string;
  text: string;
}

let todos: Todo[] = [];

router.get("/todos", async (ctx) => {
  try {
    const todos = await getDB().collection<TodosSchema>("todos").find();

    if (Array.isArray(todos)) {
      const transformedTodos = todos.map(
        (t: { _id: ObjectId; text: string }) => {
          return {
            id: t._id.$oid,
            text: t.text,
          };
        }
      );
      ctx.response.body = { todos: transformedTodos };
    }
  } catch (error) {
    ctx.response.body = { error };
  }
});

router.post("/todos", async (ctx) => {
  const data = await ctx.request.body();
  const value = await data.value;
  const newTodo: Todo = {
    // id: new Date().toISOString(),
    text: value.text,
  };

  const insertedTodoId = await getDB()
    .collection<TodosSchema>("todos")
    .insertOne(newTodo);
  newTodo.id = insertedTodoId.$oid;

  ctx.response.body = { message: "Created todo!", todo: newTodo };
});

router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;
  const data = await ctx.request.body();
  const value = await data.value;

  await getDB()
    .collection("todos")
    .updateOne({ _id: ObjectId(tid) }, { $set: { text: value.text } });
  ctx.response.body = { message: "Updated todo" };
});

router.delete("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;
  // todos = todos.filter((todo) => todo.id !== tid);
  await getDB()
    .collection("todos")
    .deleteOne({ _id: ObjectId(tid) });
  ctx.response.body = { message: "Deleted todo" };
});

export default router;
