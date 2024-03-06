import { serve } from "@hono/node-server";
import { Hono } from "hono";
import book from "./routes/book-routes";
import { sequelizeTryConnection } from "./config/database-config";
import author from "./routes/author-routes";

const app = new Hono();

// Check database connection
sequelizeTryConnection();

// Routes
app.route("/books", book);
app.route("/authors", author);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
