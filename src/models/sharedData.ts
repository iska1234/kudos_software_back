import z from "zod";

export const sharedDataSchema = z.object({

  adminId: z.number(),
  savedDataId: z.number(),
  sharedWithUserId: z.number(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type SharedData = z.infer<typeof sharedDataSchema>;
export type Shared = SharedData;


