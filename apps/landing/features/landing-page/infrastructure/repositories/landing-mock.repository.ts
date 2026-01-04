/**
 * Infrastructure Layer - Repository Implementation
 * 
 * This file contains the concrete implementation of the repository interface.
 * For now, we use mock data. Later, this can be replaced with API calls.
 * Following Open/Closed Principle (OCP): Open for extension, closed for modification.
 */

import { HeaderConfig, HeroConfig, StatisticsConfig, FeaturesConfig } from '../../domain/entities/landing.types'
import type { ILandingRepository } from '../../domain/repositories/landing.repository'

/**
 * Mock implementation of landing repository
 * 
 * This class follows:
 * - Liskov Substitution Principle (LSP): Can replace ILandingRepository anywhere
 * - Dependency Inversion Principle (DIP): Implements the abstraction
 */
export class LandingMockRepository implements ILandingRepository {
  /**
   * Gets header configuration from mock data
   */
  public async getHeaderConfig(): Promise<HeaderConfig> {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 0))

    return new HeaderConfig(
      {
        src: '/logo.svg', // Will be replaced with actual logo
        alt: 'Medrese Online Logo'
      },
      [
        { label: 'courses', href: '/courses' },
        { label: 'mentors', href: '/mentors' },
        { label: 'features', href: '/features' },
      ],
      {
        signIn: {
          label: 'signin',
          href: '/signin',
        },
        joinFree: {
          label: 'join for free',
          href: '/join',
        },
      }
    )
  }

  /**
   * Gets hero section configuration from mock data
   */
  public async getHeroConfig(): Promise<HeroConfig> {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 0))

    return new HeroConfig(
      'The Digital Age Madrasa:',
      'Beyond Borders, Bound to Knowledge',
      'Fiqh, Kalam, Arabic, and Hifz education; featuring live classes, interactive flashcards, and expert scholars on a single platform.',
      [
        {
          label: 'Start Learning Now',
          href: '/signup',
          variant: 'primary',
        },
        {
          label: 'Explore courses',
          href: '/courses',
          variant: 'secondary',
        },
      ]
    )
  }

  /**
   * Gets statistics section configuration from mock data
   */
  public async getStatisticsConfig(): Promise<StatisticsConfig> {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 0))

    return new StatisticsConfig([
      {
        value: '10k+',
        label: 'Talaba',
      },
      {
        value: '30+',
        label: 'Scholars',
      },
      {
        value: '1.2k+',
        label: 'Hours of Content',
      },
    ])
  }

  /**
   * Gets features section configuration from mock data
   */
  public async getFeaturesConfig(): Promise<FeaturesConfig> {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 0))

    return new FeaturesConfig(
      'Why Choose Online Madrasah?',
      'We combine traditional teaching methods with modern technology to provide the best learning experience.',
      [
        {
          icon: 'play',
          title: 'Live Interactive Classes',
          description: 'Study classical texts with qualified scholars in real-time. Raise your hand, ask questions, and receive direct feedback instantly.',
        },
        {
          icon: 'document',
          title: 'Structural Assignments',
          description: 'Stay on track with organized homework, quizzes, and progress reports. Never lose sight of your learning goals with our dashboard.',
        },
        {
          icon: 'community',
          title: 'Global Student Community',
          description: 'Connect with fellow students worldwide. Discuss complex topics, share notes, and grow together in a supportive environment.',
        },
      ]
    )
  }
}

