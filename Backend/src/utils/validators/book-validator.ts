import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

// create Book
const createBookValidator = z.object({
  title: z.string({ required_error: "Title is required" }),
  summary: z.string({ required_error: "Summary is required" }),
  publicactionDate: z.string({
    invalid_type_error: "Publication date must be string",
    required_error: "Publication date is required",
  }),
  genre: z.array(z.string(), {
    invalid_type_error: "Must provide an array",
    required_error: "Genre is required",
  }),
  authorId: z.number({
    invalid_type_error: "Author id must be integer",
    required_error: "Author id is required",
  }),
});

// Update book
const updateBookValidator = z.object({
  title: z.string().optional(),
  summary: z.string().optional(),
  publicactionDate: z.string().optional(),
  genre: z
    .array(z.string(), {
      invalid_type_error: "Must provide an array",
      required_error: "Genre is required",
    })
    .optional(),
  authorId: z
    .number({ invalid_type_error: "Author id must be integer" })
    .optional(),
});

export const createBook = zValidator("json", createBookValidator, (result, c) => {
  if (!result.success) {
    const error: [] = JSON.parse(result.error.message);
    const { message } = error[error.length - 1];
    return c.json({ message }, 400);
  }
});

export const updateBook = zValidator("json", updateBookValidator, (result, c) => {
  if (!result.success) {
    const error: [] = JSON.parse(result.error.message);
    const { message } = error[error.length - 1];
    return c.json({ message }, 400);
  }
});
