import { useApplicationStore } from '../../stores/useApplicationStore'
import { useNavigationStore } from '../../stores/useNavigationStore'
import { Layout } from '../../components/Layout'
import { ProgressBar } from '../../components/ProgressBar'
import { StepProduct } from './StepProduct'
import { StepGrass } from './StepGrass'
import { StepRate } from './StepRate'
import { StepConfirm } from './StepConfirm'

const TOTAL_STEPS = 4

function StepContent({ step }: { step: number }) {
  switch (step) {
    case 1: return <StepProduct />
    case 2: return <StepGrass />
    case 3: return <StepRate />
    case 4: return <StepConfirm />
    default: return null
  }
}

export function LogAppShell() {
  const store = useApplicationStore()
  const navigate = useNavigationStore((s) => s.navigate)
  const { step, nextStep, prevStep } = store

  const canAdvance = (() => {
    switch (step) {
      case 1: return store.selectedProductId !== null
      case 2: return store.grassType !== null && store.mowingHeight !== null
      case 3: return store.rate !== '' && parseFloat(store.rate) > 0 && store.date !== ''
      case 4: return true
      default: return false
    }
  })()

  const handleBack = () => {
    if (step === 1) {
      store.reset()
      navigate('home')
    } else {
      prevStep()
    }
  }

  return (
    <Layout title="Log Application" showBack={false} showNav={false}>
      <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
      <StepContent step={step} />
      {step < 4 && (
        <div className="flex gap-3 p-4 pb-6">
          <button
            onClick={handleBack}
            className="flex-1 py-3 rounded-xl bg-white/70 text-gray-700 font-semibold active:bg-white border border-gray-200"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          <button
            onClick={nextStep}
            disabled={!canAdvance}
            className="flex-1 py-3 rounded-xl bg-green-600 text-white font-semibold active:bg-green-700 disabled:opacity-40 shadow-md shadow-green-900/20"
          >
            Next
          </button>
        </div>
      )}
    </Layout>
  )
}
