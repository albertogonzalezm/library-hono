import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

// create Book
const createBookSchema = z.object({
  title: z.string({ required_error: "Titulo requerido" }),
  summary: z.string({ required_error: "Resumen requerido" }),
  publicactionDate: z.string({ required_error: "Fecha requerida" }),
  authorId: z.number({
    invalid_type_error: "AuthorId must be integer",
    required_error: "Id de autor requerido",
  }),
});

export const createBook = zValidator("json", createBookSchema, (result, c) => {
  if (!result.success) {
    const error: [] = JSON.parse(result.error.message);
    const { message } = error[error.length - 1];
    return c.json({ message }, 400);
  }
});

// Update book
const updateBookSchema = z.object({
  title: z.string().optional(),
  summary: z.string().optional(),
  publicactionDate: z.string().optional(),
  authorId: z
    .number({ invalid_type_error: "AuthorId must be integer" })
    .optional(),
});

export const updateBook = zValidator("json", updateBookSchema, (result, c) => {
  if (!result.success) {
    const error: [] = JSON.parse(result.error.message);
    const { message } = error[error.length - 1];
    return c.json({ message }, 400);
  }
});
