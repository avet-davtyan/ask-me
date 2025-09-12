import z from "zod";

export const HealthCheckResponseDTO = z.object({
  status: z.string(),
  vectorCount: z.number(),
  modelInfo: z.string(),
});

export type HealthCheckResponseDTO = z.infer<typeof HealthCheckResponseDTO>;
