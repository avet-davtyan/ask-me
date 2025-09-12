import { config } from "dotenv";
import { z } from "zod";

const EnvVariablesSchema = z.object({
  SERVER_PORT: z.string().regex(/[0-9]{1,}/g).transform((val) => Number(val)),
  OPENAI_API_KEY: z.string(),
})

export function envConfig(path: string): void {
  config({ path });
}

envConfig("./.env");

const ENV = EnvVariablesSchema.parse({
  SERVER_PORT: process.env.SERVER_PORT,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
});

export default ENV;
