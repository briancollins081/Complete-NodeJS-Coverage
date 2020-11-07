import { Application } from "https://deno.land/x/oak/mod.ts";
import todoRoutes from "./todos/todos.ts";

const app = new Application();

app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods());

app.use(async (ctx, next) => {
  console.log("Middleware!");
  await next();
});

await app.listen({ port: 8000 });
