/**
 * Domain Layer - Entities
 * 
 * This file contains domain entities and types for the landing page feature.
 * These are pure business objects with no dependencies on external frameworks.
 */

/**
 * Navigation link entity
 */
export interface NavigationLink {
  readonly label: string
  readonly href: string
}

/**
 * Header configuration entity
 */
export class HeaderConfig {
  constructor(
    public readonly logo: {
      readonly src: string
      readonly alt: string
    },
    public readonly navigationLinks: readonly NavigationLink[],
    public readonly ctaButtons: {
      readonly signIn: {
        readonly label: string
        readonly href: string
      }
      readonly joinFree: {
        readonly label: string
        readonly href: string
      }
    }
  ) {}

  /**
   * Validates header configuration
   */
  public isValid(): boolean {
    return (
      this.navigationLinks.length > 0 &&
      this.ctaButtons.signIn.label.length > 0 &&
      this.ctaButtons.joinFree.label.length > 0
    )
  }
}

/**
 * Hero section CTA button entity
 */
export interface HeroCtaButton {
  readonly label: string
  readonly href: string
  readonly variant: 'primary' | 'secondary'
}

/**
 * Hero section configuration entity
 */
export class HeroConfig {
  constructor(
    public readonly title: string,
    public readonly subtitle: string,
    public readonly description: string,
    public readonly ctaButtons: readonly HeroCtaButton[],
    public readonly backgroundImage?: string
  ) {}

  /**
   * Validates hero configuration
   */
  public isValid(): boolean {
    return (
      this.title.length > 0 &&
      this.subtitle.length > 0 &&
      this.description.length > 0 &&
      this.ctaButtons.length > 0
    )
  }
}

/**
 * Statistics item entity
 */
export interface StatisticsItem {
  readonly value: string
  readonly label: string
}

/**
 * Statistics section configuration entity
 */
export class StatisticsConfig {
  constructor(
    public readonly items: readonly StatisticsItem[]
  ) {}

  /**
   * Validates statistics configuration
   */
  public isValid(): boolean {
    return this.items.length > 0 && this.items.every(item => 
      item.value.length > 0 && item.label.length > 0
    )
  }
}

/**
 * Feature card entity
 */
export interface FeatureCard {
  readonly icon: string // Icon name or SVG path
  readonly title: string
  readonly description: string
}

/**
 * Features section configuration entity
 */
export class FeaturesConfig {
  constructor(
    public readonly title: string,
    public readonly subtitle: string,
    public readonly cards: readonly FeatureCard[]
  ) {}

  /**
   * Validates features configuration
   */
  public isValid(): boolean {
    return (
      this.title.length > 0 &&
      this.subtitle.length > 0 &&
      this.cards.length > 0 &&
      this.cards.every(card => 
        card.title.length > 0 && card.description.length > 0
      )
    )
  }
}

