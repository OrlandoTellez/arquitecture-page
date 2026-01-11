import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      type: z.string(),
      year: z.string(),
      location: z.string(),
      description: z.string(),
      portada: image(),
    }),
});

export const collections = {
  projects,
};
