/**
 * Application Layer - Use Cases
 * 
 * This file contains business use cases.
 * Use cases orchestrate the flow of data to and from entities.
 * Following Single Responsibility Principle (SRP) from SOLID.
 */

import type { FeaturesConfig } from '../../domain/entities/landing.types'
import type { ILandingRepository } from '../../domain/repositories/landing.repository'

/**
 * Use case for getting features section configuration
 * 
 * This class follows:
 * - Single Responsibility Principle (SRP): One reason to change
 * - Dependency Inversion Principle (DIP): Depends on abstraction (repository interface)
 */
export class GetFeaturesConfigUseCase {
  constructor(private readonly repository: ILandingRepository) {}

  /**
   * Executes the use case
   * @returns Promise resolving to FeaturesConfig
   */
  public async execute(): Promise<FeaturesConfig> {
    return await this.repository.getFeaturesConfig()
  }
}


