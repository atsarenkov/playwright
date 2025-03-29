import { z } from "zod";

export const organizationSchema = z.object({
  id: z.string().length(24),
  displayName: z.string().min(13).max(15),
  desc: z.string().optional(),
  descData: z.object({
    emoji: z.object({}).nullable(),
  }),
  website: z.string().url(),
  offering: z.literal('trello.free'),
  products: z.array(z.string().nullable())
});