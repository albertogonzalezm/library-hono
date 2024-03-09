import { Hono } from "hono";
import * as models from "../schema/export-schemas";
import { createBook, updateBook } from "../utils/validators/book-validator";
import { Op } from "sequelize";

const book = new Hono();

// Create book
book.post("/create", createBook, async (c) => {
  const body = c.req.valid("json");

  try {
    const book = {
      ...body,
      publicactionDate: new Date(body.publicactionDate),
      genresId: [...new Set(body.genresId.sort())],
    };

    const genres = await models.Genre.findAll({
      where: {
        id: {
          [Op.in]: book.genresId,
        },
      },
    });

    // const genresFound = genres.filter(elem=>book.genresId.includes());

    if (book.genresId.length === 0)
      return c.json({ message: "You must provide genres" }, 400);

    if (genres.length != book.genresId.length) return c.json({}, 404);

    const bookSaved = await models.Book.create(book);

    bookSaved.addGenres(genres);

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

  const book = await models.Book.findByPk(bookId, {
    attributes: {
      exclude: ["authorId"],
    },
    include: [
      {
        model: models.Author,
      },
      {
        model: models.Genre,
        through: { attributes: [] },
      },
    ],
  });

  if (!book) {
    return c.json({ message: `Book with id=${bookId} not found` }, 404);
  }

  return c.json(book, 200);
});

// find all books
book.get("", async (c) => {
  const books = await models.Book.findAll();

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
