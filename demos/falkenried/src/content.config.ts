import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const localized = z.object({ de: z.string().min(1), en: z.string().min(1) });

const properties = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/properties" }),
  schema: z.object({
    id: z.string(), slug: z.string(), location: z.enum(["Schleinikon", "Boppelsen", "Zürcher Unterland"]),
    address: z.string(), types: z.array(z.enum(["apartments", "commercial", "parking"])).min(1),
    title: localized, summary: localized, description: localized,
    facts: z.array(z.object({ label: localized, value: localized })).min(1),
    features: z.array(localized), locationNotes: localized,
    image: z.object({ key: z.string(), alt: localized, classification: z.enum(["illustrative", "documentary"]), source: z.string() }),
    source: z.object({ url: z.string().url(), checkedAt: z.string(), confirmationNote: localized }),
  }),
});

export const collections = { properties };
