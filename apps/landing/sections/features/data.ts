/**
 * Features Section Data
 *
 * Contains all data for the features section
 */

export const featuresData = {
  title: 'Why Choose Online Madrasah?',
  subtitle:
    'We combine traditional teaching methods with modern technology to provide the best learning experience.',
  cards: [
    {
      icon: 'youtube',
      title: 'Live Interactive Classes',
      description:
        'Study classical texts with qualified scholars in real-time. Raise your hand, ask questions, and receive direct feedback instantly.',
    },
    {
      icon: 'assignments',
      title: 'Structural Assignments',
      description:
        'Stay on track with organized homework, quizzes, and progress reports. Never lose sight of your learning goals with our dashboard.',
    },
    {
      icon: 'community',
      title: 'Global Student Community',
      description:
        'Connect with fellow students worldwide. Discuss complex topics, share notes, and grow together in a supportive environment.',
    },
  ],
  colors: {
    title: 'text-gray-900',
    subtitle: 'text-gray-600',
    card: {
      background: 'bg-white',
      title: 'text-gray-900',
      description: 'text-gray-600',
      iconBackground: 'bg-accent-50',
      iconBorder: 'border-gray-200',
      shadow: 'shadow-md',
      hoverShadow: 'hover:shadow-lg',
    },
  },
} as const
