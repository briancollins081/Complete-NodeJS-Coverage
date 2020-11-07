import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo {
  id: string;
  description: string;
}

let todos: Todo[] = [
  {
    id: "1604636968415",
    description: "Mother nature is blue in color",
  },
];

router.get("/todos", (ctx) => {
  ctx.response.body = { message: "Fetched todos success", todos };
});
router.post("/todos", async (ctx) => {
  const data = await ctx.request.body();
  let value;
  if (data.type !== "json") {
    ctx.response.body = {
      success: false,
      message: "No data!, pass json data",
    };
    return;
  }
  value = await data.value;
  const newTodo: Todo = {
    id: new Date().getTime().toString(),
    description: value.description,
  };
  todos.push(newTodo);
  ctx.response.body = {
    success: true,
    message: "New todo created successfully",
    todo: newTodo,
  };
});
router.put("/todos/:todoId", async (ctx) => {
  const data = await ctx.request.body();
  if (data.type !== "json") {
    ctx.response.body = {
      success: false,
      message: "No todo data!, pass json data",
    };
    return;
  }
  const value = await data.value;

  const tid = ctx.params.todoId;

  const todoIndex = todos.findIndex((t) => {
    return tid === t.id;
  });

  if (todoIndex < 0) {
    ctx.response.body = {
      success: false,
      message: "No todo with this id: " + tid,
    };
    return;
  }
  todos[todoIndex] = {
    id: todos[todoIndex].id,
    description: value.description,
  };

  ctx.response.body = {
    success: true,
    message: "Updated todo successfuly",
    todo: todos[todoIndex],
  };
});
router.delete("/todos/:todoId", (ctx) => {
  const tid = ctx.params.todoId;
  const todoIndex = todos.findIndex((t) => tid == t.id);
  if (todoIndex < 0) {
    ctx.response.body = {
      success: false,
      message: "No todo found with id: " + tid,
    };
    return;
  }
  const deleted = todos.splice(todoIndex, 1);
  ctx.response.body = {
      success: true,
      message: "Deleted todo successfully",
      data: deleted
  }
});

export default router;
