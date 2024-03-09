import { serve } from "@hono/node-server";
import { Hono } from "hono";
import book from "./routes/book-routes";
import * as models from "./schema/export-schemas";
import sequelize, {
  sequelizeAutenticate,
  sequelizeSync,
} from "./config/database-config";
import author from "./routes/author-routes";
import genre from "./routes/genre-routes";

const app = new Hono();

// Database
sequelizeSync();
sequelizeAutenticate();

// Routes
app.route("/books", book);
app.route("/authors", author);
app.route("/genres", genre);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
