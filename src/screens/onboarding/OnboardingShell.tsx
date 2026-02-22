import { useOnboardingStore } from '../../stores/useOnboardingStore'
import { useNavigationStore } from '../../stores/useNavigationStore'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { addLocation } from '../../db/hooks'
import { Layout } from '../../components/Layout'
import { ProgressBar } from '../../components/ProgressBar'
import { StepLocation } from './StepLocation'
import { StepGDDExplain } from './StepGDDExplain'
import { StepFirstApp } from './StepFirstApp'

const TOTAL_STEPS = 3

function StepContent({ step }: { step: number }) {
  switch (step) {
    case 1: return <StepLocation />
    case 2: return <StepGDDExplain />
    case 3: return <StepFirstApp />
    default: return null
  }
}

export function OnboardingShell() {
  const store = useOnboardingStore()
  const navigate = useNavigationStore((s) => s.navigate)
  const setOnboardingComplete = useSettingsStore((s) => s.setOnboardingComplete)
  const { step, nextStep, prevStep, lat, lng, locationName, zipCode } = store

  const canAdvance = (() => {
    switch (step) {
      case 1: return lat !== null && lng !== null && locationName !== ''
      case 2: return true
      case 3: return true
      default: return false
    }
  })()

  const handleNext = async () => {
    if (step === 1 && lat !== null && lng !== null) {
      // Save location to DB
      await addLocation({
        name: locationName,
        lat,
        lng,
        zipCode,
      })
    }

    if (step === TOTAL_STEPS) {
      setOnboardingComplete()
      store.reset()
      navigate('logApp')
      return
    }

    nextStep()
  }

  const handleSkip = () => {
    setOnboardingComplete()
    store.reset()
    navigate('home')
  }

  return (
    <Layout title="Welcome" showBack={false} showNav={false}>
      <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
      <StepContent step={step} />
      <div className="flex gap-3 p-4 pb-6">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="flex-1 py-3 rounded-xl bg-white/70 text-gray-700 font-semibold active:bg-white border border-gray-200"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canAdvance}
          className="flex-1 py-3 rounded-xl bg-green-600 text-white font-semibold active:bg-green-700 disabled:opacity-40 shadow-md shadow-green-900/20"
        >
          {step === TOTAL_STEPS ? 'Log First Application' : 'Next'}
        </button>
      </div>
      {step === TOTAL_STEPS && (
        <div className="px-4 pb-4 -mt-2">
          <button
            onClick={handleSkip}
            className="w-full py-2 text-sm text-gray-400 active:text-gray-600"
          >
            Skip for now
          </button>
        </div>
      )}
    </Layout>
  )
}
