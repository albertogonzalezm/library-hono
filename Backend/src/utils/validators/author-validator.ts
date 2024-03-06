import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

// create Book
const createAuthorSchema = z.object({
  firstName: z.string({
    invalid_type_error: "First name must be string",
    required_error: "First name is required",
  }),
  lastName: z
    .string({ invalid_type_error: "Last name must be string" })
    .optional(),
});

export const createAuthor = zValidator(
  "json",
  createAuthorSchema,
  (result, c) => {
    if (!result.success) {
      const error: [] = JSON.parse(result.error.message);
      const { message } = error[error.length - 1];
      return c.json({ message }, 400);
    }
  }
);

// Update book
const updateAuthorSchema = z.object({
  firstName: z
    .string({ invalid_type_error: "First name must be string" })
    .optional(),
  lastName: z
    .string({ invalid_type_error: "Last name must be string" })
    .optional(),
});

export const updateAuthor = zValidator(
  "json",
  updateAuthorSchema,
  (result, c) => {
    if (!result.success) {
      const error: [] = JSON.parse(result.error.message);
      const { message } = error[error.length - 1];
      return c.json({ message }, 400);
    }
  }
);
