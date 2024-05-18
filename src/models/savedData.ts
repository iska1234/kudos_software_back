import z from "zod";

export const savedDataSchema = z.object({
  description: z.string().min(1),
  dataContent: z.string().min(1),
  userId: z.number(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type SavedData = z.infer<typeof savedDataSchema>;
export type Saved = SavedData;