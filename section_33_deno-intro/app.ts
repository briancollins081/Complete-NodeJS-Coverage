// const text =
//   "The mode is a sequence of 3 octal numbers. The first/left-most number specifies the permissions for the owner. The second number specifies the permissions for the group. The last/right-most number specifies the permissions for others. For example, with a mode of 0o764, the owner (7) can read/write/execute, the group (6) can read/write and everyone else (4) can read only.";

// const encoder = new TextEncoder();
// Deno.writeFile("message.txt", encoder.encode(text), {create: true, mode: 0o777, append:false}).then(() => {
//   console.log("Written to file");
// });

/* 
import { serve } from "https://deno.land/std@0.76.0/http/server.ts";

const server = serve({ port: 8000 });

for await (const req of server) {
  req.respond({ body: "Hello World\n" });
} */

// Using oak

import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello world!";
});

await app.listen({ port: 8000 });
