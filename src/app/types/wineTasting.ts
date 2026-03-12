import { z } from 'zod';

// ─── STEP 1: IDENTIFICATION ─────────────────────────────────────────────────

export const WineStyleEnum = z.enum(['tranquilo', 'espumante', 'fortificado', 'laranja']);
export const WineColorEnum = z.enum(['branco', 'rosé', 'tinto', 'laranja']);

export const VinificationMethodEnum = z.enum([
  'inox',
  'madeira',
  'sur_lies',
  'malolatica',
  'anfora',
  'maceracao_carbonica',
  'skin_contact',
]);

export const IdentificationSchema = z.object({
  wineStyle: WineStyleEnum,
  wineColor: WineColorEnum,
  grapeVarieties: z.array(z.string()).min(1, 'Selecione ao menos uma casta'),
  region: z.string().min(1, 'Informe a região'),
  country: z.string().min(1, 'Informe o país'),
  vintage: z.coerce.number().int().min(1900).max(2030).optional(),
  producer: z.string().min(1, 'Informe o produtor'),
  alcoholContent: z.coerce.number().min(0).max(25).optional(),
  vinificationMethods: z.array(VinificationMethodEnum).default([]),
});

// ─── STEP 2: VISUAL ANALYSIS ────────────────────────────────────────────────

export const ClarityOptionEnum = z.enum(['brilliant', 'clear', 'hazy', 'dull']);
export const ViscosityOptionEnum = z.enum(['low', 'medium', 'high']);

export const VisualStepSchema = z.object({
  hue: z.number().min(0).max(100),
  clarity: ClarityOptionEnum,
  viscosity: ViscosityOptionEnum,
});

// ─── STEP 3: OLFACTORY ANALYSIS ─────────────────────────────────────────────

export const AromaIntensityOptionEnum = z.enum(['baixa', 'media', 'pronunciada']);
export const WineAgeStateEnum = z.enum(['jovem', 'em_evolucao', 'evoluido']);

export const AromaFamilyEnum = z.enum([
  'citricos',
  'frutas_brancas',
  'frutas_tropicais',
  'frutas_vermelhas',
  'frutas_negras',
  'florais',
  'herbaceos',
  'especiarias',
  'minerais',
  'sub_bosque',
  'animais',
  'madeira',
  'lacteos',
  'balsamicos',
]);

export const OlfactoryStepSchema = z.object({
  aromaIntensity: AromaIntensityOptionEnum,
  wineAgeState: WineAgeStateEnum,
  selectedAromas: z
    .array(
      z.object({
        family: z.string(),
        subcategory: z.string(),
        aroma: z.string(),
      }),
    )
    .min(1, 'Selecione ao menos um aroma')
    .max(6, 'Máximo de 6 aromas'),
});

// ─── STEP 4: GUSTATORY ANALYSIS ─────────────────────────────────────────────

export const ResidualSugarEnum = z.enum([
  'nature',
  'extra_seco',
  'seco',
  'meio_seco',
  'meio_doce',
  'doce',
  'licoroso',
]);

export const GustAcidityEnum = z.enum([
  'baixa',
  'media_menos',
  'media',
  'media_mais',
  'alta',
]);

export const GustTanninsLevelEnum = z.enum(['baixos', 'medios', 'altos']);
export const TanninQualityEnum = z.enum(['finos', 'sedosos', 'maduros', 'firmes', 'rusticos']);

export const GustAlcoholEnum = z.enum(['baixo', 'medio', 'alto']);
export const GustBodyEnum = z.enum(['leve', 'medio', 'encorpado']);
export const FlavorIntensityEnum = z.enum(['baixa', 'media', 'pronunciada']);

export const GustatoryStepSchema = z.object({
  residualSugar: ResidualSugarEnum,
  acidity: GustAcidityEnum,
  tanninsLevel: GustTanninsLevelEnum,
  tanninQuality: TanninQualityEnum,
  alcohol: GustAlcoholEnum,
  body: GustBodyEnum,
  flavorIntensity: FlavorIntensityEnum,
  persistence: z.number().min(0).max(45),
});

// ─── FULL REVIEW ────────────────────────────────────────────────────────────

export const WineTastingReviewSchema = z.object({
  identification: IdentificationSchema,
  visual: VisualStepSchema,
  olfactory: OlfactoryStepSchema,
  gustatory: GustatoryStepSchema,
});

// ─── INFERRED TYPES ─────────────────────────────────────────────────────────

export type WineStyle = z.infer<typeof WineStyleEnum>;
export type WineColor = z.infer<typeof WineColorEnum>;
export type VinificationMethod = z.infer<typeof VinificationMethodEnum>;
export type Identification = z.infer<typeof IdentificationSchema>;

export type ClarityOption = z.infer<typeof ClarityOptionEnum>;
export type ViscosityOption = z.infer<typeof ViscosityOptionEnum>;
export type VisualStep = z.infer<typeof VisualStepSchema>;

export type AromaIntensityOption = z.infer<typeof AromaIntensityOptionEnum>;
export type WineAgeState = z.infer<typeof WineAgeStateEnum>;
export type AromaFamily = z.infer<typeof AromaFamilyEnum>;
export type SelectedAroma = { family: string; subcategory: string; aroma: string };
export type OlfactoryStep = z.infer<typeof OlfactoryStepSchema>;

export type ResidualSugar = z.infer<typeof ResidualSugarEnum>;
export type GustAcidity = z.infer<typeof GustAcidityEnum>;
export type GustTanninsLevel = z.infer<typeof GustTanninsLevelEnum>;
export type TanninQuality = z.infer<typeof TanninQualityEnum>;
export type GustAlcohol = z.infer<typeof GustAlcoholEnum>;
export type GustBody = z.infer<typeof GustBodyEnum>;
export type FlavorIntensity = z.infer<typeof FlavorIntensityEnum>;
export type GustatoryStep = z.infer<typeof GustatoryStepSchema>;

export type WineTastingReview = z.infer<typeof WineTastingReviewSchema>;
