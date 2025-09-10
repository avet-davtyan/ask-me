import { z } from "zod";

export const IngestBodyDTO = z.object({
  id: z.string(),
  text: z.string(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export type IngestBodyDTO = z.infer<typeof IngestBodyDTO>;
