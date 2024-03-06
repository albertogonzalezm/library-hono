import { serve } from "@hono/node-server";
import { Hono } from "hono";
import book from "./routes/book-routes";
import { sequelizeTryConnection } from "./config/sequelize-config";

const app = new Hono();

app.route("/books", book);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Check database connection
sequelizeTryConnection();

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
