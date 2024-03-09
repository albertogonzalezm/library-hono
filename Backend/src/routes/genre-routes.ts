import { Hono } from "hono";
import * as models from "../schema/export-schemas";
import { Op } from "sequelize";

const genre = new Hono();

genre.post("/create", async (c) => {
  const genres = await models.Genre.bulkCreate([
    { name: "Romance" },
    { name: "Ficcion" },
    { name: "Fantasia" },
    { name: "Magia" },
    { name: "Espacio" },
    { name: "Naturaleza" },
    { name: "Historia" },
  ]);

  return c.json(genres, 201);
});

genre.get("/find", async (c) => {
  const genres = await models.Genre.findAll({
    where: {
      id: {
        [Op.in]: [1, 5],
      },
    },
  });

  return c.json(genres, 200);
});

genre.delete("/:id", async (c) => {
  const id = c.req.param("id");

  await models.Genre.destroy({
    where: {
      id,
    },
  });

  return c.json(204);
});

export default genre;
