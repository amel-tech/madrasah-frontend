import { DialogTitle } from '@madrasah/ui/components/dialog'
import { cn } from '@madrasah/ui/lib/utils'

interface WizardHeaderProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export function WizardHeader({ currentStep, totalSteps, steps }: WizardHeaderProps) {
  return (
    <div className="bg-primary/5 p-6 border-b flex justify-between items-center shrink-0">
      <div>
        <DialogTitle className="text-xl font-semibold text-primary">Yeni Ders Oluştur</DialogTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Adım
          {' '}
          {currentStep}
          {' '}
          /
          {' '}
          {totalSteps}
          :
          {' '}
          {steps[currentStep - 1]}
        </p>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
          <div
            key={step}
            className={cn(
              'w-2.5 h-2.5 rounded-full transition-colors',
              currentStep >= step ? 'bg-primary' : 'bg-primary/20',
            )}
          />
        ))}
      </div>
    </div>
  )
}
