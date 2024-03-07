import { Hono } from "hono";
import { createAuthor } from "../utils/validators/author-validator";
import * as models from "../schema/export-schemas";
import { Op } from "sequelize";

const author = new Hono();

// Create author
author.post("/create", createAuthor, async (c) => {
  const { firstName, lastName } = c.req.valid("json");
  const authorSaved = await models.Authors.create({ firstName, lastName });

  return c.json(authorSaved, 201);
});

// Find author by id
author.get("/:id", async (c) => {
  const authorId = c.req.param("id");

  const author = await models.Authors.findByPk(authorId, {
    include: [
      {
        model: models.Books,
        attributes: { exclude: ["authorId"] },
      },
    ],
  });

  if (!author) {
    return c.json({ message: `Author with id=${authorId} not found` }, 404);
  }

  return c.json(author, 201);
});

// Find author by name and find all
author.get("", async (c, next) => {
  const search = c.req.query("search");
  let offset = c.req.query("offset");
  let authors;

  if (!offset || isNaN(+offset)) offset = "0";
  // if (!search) await next();

  if (!search) {
    authors = await models.Authors.findAll({ limit: 15, offset: +offset });
  } else {
    authors = await models.Authors.findAll({
      where: {
        [Op.or]: [
          {
            firstName: { [Op.like]: `%${search}%` },
          },
          {
            lastName: { [Op.like]: `%${search}%` },
          },
        ],
      },
      limit: 15,
      offset: +offset,
    });
  }

  if (authors.length === 0 && !search) {
    return c.json({ message: `Authors not found` }, 404);
  } else if (authors.length === 0 && search) {
    return c.json({ message: `Author/s with name=${search} not found` }, 404);
  }

  return c.json(authors, 200);
});

// find all authors
/* author.get("", async (c) => {
  let offset = c.req.query("offset");
  if (!offset || isNaN(+offset)) offset = "0";

  const authors = await models.Authors.findAll({ limit: 15, offset: +offset });

  if (authors.length === 0) {
    return c.json({ message: `Authors not found` }, 404);
  }

  return c.json(authors, 200);
}); */

export default author;
