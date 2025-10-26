import z from "zod";

const envVars = import.meta.env;

const configSchema = z.object({
  VITE_API_URL: z.string(),
});
configSchema.parse(envVars);

export const CONFIG = envVars;
