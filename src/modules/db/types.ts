import z from "zod";

export interface IDBRecordInternal {
  id: string;
  text: string;
  metadata?: Record<string, string>;
  vector: number[];
}

export const DBRecordSchema = z.object({
  id: z.string(),
  text: z.string(),
  metadata: z.record(z.string(), z.string()).optional(),
  vector: z.array(z.number()),
});

export type DBRecordSchema = z.infer<typeof DBRecordSchema>;
