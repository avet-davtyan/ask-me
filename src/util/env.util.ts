import { config } from "dotenv";
import { z } from "zod";

const EnvVariablesSchema = z.object({
  SERVER_PORT: z.string().regex(/[0-9]{1,}/g).transform((val) => Number(val)),
})

export function envConfig(path: string): void {
  config({ path });
}

envConfig("./.env");

const ENV = EnvVariablesSchema.parse({
  SERVER_PORT: process.env.SERVER_PORT,
});

export default ENV;
