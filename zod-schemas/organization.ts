import { z } from "zod";

export const organizationSchema = z.object({
  id: z.string().length(24),
  name: z.string().min(1).max(100),
  desc: z.string().optional(),
  descData: z.object({
    emoji: z.object({}).nullable(),
  }),
  url: z.string().url(),
  website: z.null(),
  offering: z.literal('trello.free'),
  products: z.array(z.string().nullable())
});