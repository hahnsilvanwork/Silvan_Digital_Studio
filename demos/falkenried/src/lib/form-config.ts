import type { Lang } from "../i18n/nav";

export type FormArea = "general" | "bmw" | "garden" | "real-estate";

interface MetadataInput {
  area: FormArea;
  lang: Lang;
  source: string;
  objectId?: string;
}

const PLACEHOLDER_KEY = "TODO-REPLACE-WITH-WEB3FORMS-KEY";

export function isWeb3FormsEnabled(key: string | undefined) {
  const value = key?.trim() ?? "";
  return value.length >= 20 && value !== PLACEHOLDER_KEY;
}

export function buildFormMetadata({ area, lang, source, objectId }: MetadataInput) {
  return {
    area,
    language: lang,
    source,
    ...(objectId ? { object_id: objectId } : {}),
  };
}
