import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

// create Book
const createBookSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  summary: z.string({ required_error: "Summary is required" }),
  publicactionDate: z.string({
    invalid_type_error: "Publication date must be string",
    required_error: "Publication date is required",
  }),
  authorId: z.number({
    invalid_type_error: "Author id must be integer",
    required_error: "Author id is required",
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
    .number({ invalid_type_error: "Author id must be integer" })
    .optional(),
});

export const updateBook = zValidator("json", updateBookSchema, (result, c) => {
  if (!result.success) {
    const error: [] = JSON.parse(result.error.message);
    const { message } = error[error.length - 1];
    return c.json({ message }, 400);
  }
});
