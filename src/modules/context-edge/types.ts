import { z } from "zod";

export const IngestBodyDTO = z.object({
  id: z.string(),
  text: z.string(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const IngestResponseDTO = z.object({
  docCount: z.number(),
  chunkCount: z.number(),
  processingTimeMs: z.number(),
});

export type IngestBodyDTO = z.infer<typeof IngestBodyDTO>;
export type IngestResponseDTO = z.infer<typeof IngestResponseDTO>;
