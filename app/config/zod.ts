import {z} from "zod"

export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 20 characters").max(60),
  email: z.string().email(),
  address: z.string().max(400).optional(),
  password: z
    .string()
    .min(6)
    .max(16),
  role: z.string(),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const createStoreSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  address: z.string().max(400).optional(),
  ownerId: z.number().optional(),
});

export const ratingSchema = z.object({
  userId: z.number(),
  storeId: z.number(),
  score: z.number().min(1).max(5),
  comment: z.string().max(500).optional(),
});
