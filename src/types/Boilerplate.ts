import z from 'zod';

const BoilerplateOptionItemSchema = z.object({
  title: z.string(),
  file: z.string()
});

const BoilerplateOptionSchema = z.object({
  name: z.string(),
  message: z.string(),
  list: z.array(BoilerplateOptionItemSchema)
});

export const BoilerplateSchema = z.object({
  name: z.string(),
  category: z.string(),
  options: z.array(BoilerplateOptionSchema)
});

export type BoilerplateInfo = z.infer<typeof BoilerplateSchema>;
