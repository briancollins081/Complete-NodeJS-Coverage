import { Application } from "https://deno.land/x/oak/mod.ts";

import todosRoutes from "./routes/todos.ts";
import { connect } from "./helpers/db.ts";

connect();

const app = new Application();

app.use(async (ctx, next) => {
  console.log("Middleware!");
  await next();
});

app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "POST, PUT, GET, DELETE"
  );
  await next();
});

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

await app.listen({ port: 8000 });
