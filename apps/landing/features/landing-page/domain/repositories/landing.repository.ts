/**
 * Domain Layer - Repository Interface
 * 
 * This interface defines the contract for data access.
 * Implementation will be in the infrastructure layer.
 * Following Dependency Inversion Principle (DIP) from SOLID.
 */

import type { HeaderConfig, HeroConfig, StatisticsConfig, FeaturesConfig } from '../entities/landing.types'

/**
 * Repository interface for landing page data
 * 
 * This interface follows:
 * - Interface Segregation Principle (ISP): Small, focused interface
 * - Dependency Inversion Principle (DIP): High-level modules depend on abstractions
 */
export interface ILandingRepository {
  /**
   * Gets header configuration
   * @returns Promise resolving to HeaderConfig
   */
  getHeaderConfig(): Promise<HeaderConfig>

  /**
   * Gets hero section configuration
   * @returns Promise resolving to HeroConfig
   */
  getHeroConfig(): Promise<HeroConfig>

  /**
   * Gets statistics section configuration
   * @returns Promise resolving to StatisticsConfig
   */
  getStatisticsConfig(): Promise<StatisticsConfig>

  /**
   * Gets features section configuration
   * @returns Promise resolving to FeaturesConfig
   */
  getFeaturesConfig(): Promise<FeaturesConfig>
}

