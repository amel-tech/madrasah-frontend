export const WIZARD_STEPS = {
  BASIC_INFO: 'basic-info',
  CURRICULUM: 'curriculum',
  PREVIEW: 'preview',
} as const

export type WizardStep = (typeof WIZARD_STEPS)[keyof typeof WIZARD_STEPS]

export const WIZARD_STEP_ORDER = [
  WIZARD_STEPS.BASIC_INFO,
  WIZARD_STEPS.CURRICULUM,
  WIZARD_STEPS.PREVIEW,
]

export const WIZARD_STEP_LABELS = {
  [WIZARD_STEPS.BASIC_INFO]: 'Temel Bilgiler',
  [WIZARD_STEPS.CURRICULUM]: 'Müfredat',
  [WIZARD_STEPS.PREVIEW]: 'Önizleme',
}
