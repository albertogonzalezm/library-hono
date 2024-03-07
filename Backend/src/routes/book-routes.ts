import { Hono } from "hono";
import * as models from "../schema/export-schemas";
import { createBook, updateBook } from "../utils/validators/book-validator";

const book = new Hono();

// Create book
book.post("/create", createBook, async (c) => {
  const body = c.req.valid("json");

  try {
    const book = { ...body, publicactionDate: new Date(body.publicactionDate) };
    const bookSaved = await models.Books.create(book);

    return c.json(bookSaved, 201);
  } catch (error: any) {
    if (error.parent.errno === 1062 && error.fields) {
      const key = Object.keys(error.fields);
      const value = Object.values(error.fields);

      return c.json(
        { message: `The book with ${key}='${value}' has already exists` },
        409
      );
    }

    return c.json(error, 500);
  }
});

// find book by id
book.get("/:id", async (c) => {
  const bookId = c.req.param("id");

  const book = await models.Books.findByPk(bookId, {
    attributes: {
      exclude: ["authorId"],
    },
    include: models.Authors,
  });

  if (!book) {
    return c.json({ message: `Book with id=${bookId} not found` }, 404);
  }

  return c.json(book, 200);
});

// find all books
book.get("", async (c) => {
  const books = await models.Books.findAll();

  if (books.length === 0) {
    return c.json({ message: `Books not found` }, 404);
  }

  return c.json(books, 200);
});

book.patch("/:id", updateBook, (c) => {
  return c.json({}, 200);
});

book.delete("/:id", (c) => {
  return c.json({}, 204);
});

export default book;
