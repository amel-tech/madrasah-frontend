'use client'

import React, { useState } from 'react'
import { ArrowLeft, CheckCircle } from '@madrasah/icons'
import { Button } from '@madrasah/ui/components/button'
import { Dialog, DialogContent, DialogTrigger } from '@madrasah/ui/components/dialog'
import { cn } from '@madrasah/ui/lib/utils'

import { WizardHeader } from './wizard-header'
import { BasicInfoStep } from './steps/basic-info-step'
import { CurriculumStep } from './steps/curriculum-step'
import { PreviewStep } from './steps/preview-step'
import {
  WIZARD_STEPS,
  WIZARD_STEP_ORDER,
  WIZARD_STEP_LABELS,
  basicInfoSchema,
  curriculumSchema,
  type WizardStep,
  type SyllabusItemSchema,
} from '~/features/kosks/types'

interface CourseWizardProps {
  children: JSX.Element
}

export function CourseWizard({ children }: CourseWizardProps) {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<WizardStep>(WIZARD_STEPS.BASIC_INFO)

  const [basicInfo, setBasicInfo] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  })
  const [syllabus, setSyllabus] = useState<SyllabusItemSchema[]>([])
  const [teaserWeeks, setTeaserWeeks] = useState(2)

  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({})

  const currentIndex = WIZARD_STEP_ORDER.indexOf(currentStep)
  const isFirstStep = currentIndex === 0
  const isLastStep = currentIndex === WIZARD_STEP_ORDER.length - 1

  const validateStep = (step: WizardStep) => {
    let result

    if (step === WIZARD_STEPS.BASIC_INFO) {
      result = basicInfoSchema.safeParse(basicInfo)
    }
    else if (step === WIZARD_STEPS.CURRICULUM) {
      result = curriculumSchema.safeParse({ syllabus })
    }

    if (result && !result.success) {
      const fieldErrors: Record<string, string[]> = {}
      result.error.errors.forEach((issue) => {
        const path = issue.path.join('.')
        if (!fieldErrors[path]) {
          fieldErrors[path] = []
        }
        fieldErrors[path].push(issue.message)
      })
      setErrors(fieldErrors)
      return false
    }

    setErrors({})
    return true
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (!isLastStep) {
        const nextStep = WIZARD_STEP_ORDER[currentIndex + 1]
        if (nextStep) setCurrentStep(nextStep)
      }
    }
  }

  const handleBack = () => {
    if (!isFirstStep) {
      const prevStep = WIZARD_STEP_ORDER[currentIndex - 1]
      if (prevStep) setCurrentStep(prevStep)
    }
  }

  const resetWizard = () => {
    setCurrentStep(WIZARD_STEPS.BASIC_INFO)
    setBasicInfo({ title: '', description: '', startDate: '', endDate: '' })
    setSyllabus([])
    setTeaserWeeks(2)
    setErrors({})
  }

  const handleOpenChange = (val: boolean) => {
    setOpen(val)
    if (!val) resetWizard()
  }

  const handleBasicInfoChange = (field: string, value: string) => {
    setBasicInfo(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSyllabusChange = (newSyllabus: SyllabusItemSchema[]) => {
    setSyllabus(newSyllabus)
    if (errors.syllabus) {
      setErrors(prev => ({ ...prev, syllabus: undefined }))
    }
  }

  const handleCancel = () => {
    if (isFirstStep) {
      setOpen(false)
    }
    else {
      handleBack()
    }
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      if (isLastStep) {
        console.log('Submitting:', { ...basicInfo, syllabus, teaserWeeks })
        setOpen(false)
      }
      else {
        handleNext()
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl! p-0 overflow-hidden h-[85vh] flex flex-col">
        <WizardHeader
          currentStep={currentIndex + 1}
          totalSteps={WIZARD_STEP_ORDER.length}
          steps={WIZARD_STEP_ORDER.map(step => WIZARD_STEP_LABELS[step])}
        />

        <div className="flex-1 overflow-y-auto p-8">
          {currentStep === WIZARD_STEPS.BASIC_INFO && (
            <BasicInfoStep
              data={basicInfo}
              errors={errors}
              onChange={handleBasicInfoChange}
            />
          )}

          {currentStep === WIZARD_STEPS.CURRICULUM && (
            <CurriculumStep
              syllabus={syllabus}
              errors={errors}
              onChange={handleSyllabusChange}
            />
          )}

          {currentStep === WIZARD_STEPS.PREVIEW && (
            <PreviewStep
              basicInfo={basicInfo}
              syllabus={syllabus}
              teaserWeeks={teaserWeeks}
              onTeaserWeeksChange={val => setTeaserWeeks(val)}
            />
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-between shrink-0">
          <Button variant="outline" onClick={handleCancel}>
            {isFirstStep
              ? 'İptal'
              : (
                  <>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {' '}
                    Geri
                  </>
                )}
          </Button>

          <Button
            onClick={handleSubmit}
            className={cn(isLastStep && 'bg-emerald-600 hover:bg-emerald-700 text-white')}
          >
            {isLastStep
              ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {' '}
                    Dersi Oluştur
                  </>
                )
              : 'Sonraki Adım'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
