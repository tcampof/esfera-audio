/** Intenciones de navegación primaria (capa A — docs/ux-ia.md). */

export interface Intention {
  id: string;
  /** i18n key under common (e.g. intentionStereo). */
  labelKey: string;
  /** Short support line i18n key. */
  supportKey: string;
  /** Category slugs that feed the curated catalog view. */
  categorySlugs: string[];
}

export const intentions: Intention[] = [
  {
    id: "stereo",
    labelKey: "intentionStereo",
    supportKey: "intentionStereoSupport",
    categorySlugs: ["altavoces", "amplificadores", "conjuntos-audio", "equipos-compactos"],
  },
  {
    id: "cinema",
    labelKey: "intentionCinema",
    supportKey: "intentionCinemaSupport",
    categorySlugs: ["altavoces", "amplificadores", "cables-accesorios"],
  },
  {
    id: "vinyl",
    labelKey: "intentionVinyl",
    supportKey: "intentionVinylSupport",
    categorySlugs: ["sonido-analogico", "amplificadores"],
  },
  {
    id: "multiroom",
    labelKey: "intentionMultiroom",
    supportKey: "intentionMultiroomSupport",
    categorySlugs: ["sonos-sistema", "altavoces-activos", "equipos-compactos"],
  },
  {
    id: "projects",
    labelKey: "intentionProjects",
    supportKey: "intentionProjectsSupport",
    categorySlugs: ["project-design-box"],
  },
];

export function getIntentions(): Intention[] {
  return intentions;
}

export function getIntentionById(id: string): Intention | undefined {
  return intentions.find((item) => item.id === id);
}

export function intentionCatalogPath(id: string): string {
  return `/catalogo?intention=${encodeURIComponent(id)}`;
}
