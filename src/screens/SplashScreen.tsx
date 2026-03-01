import { useNavigationStore } from '../stores/useNavigationStore'
import { useSettingsStore } from '../stores/useSettingsStore'
import { Layout } from '../components/Layout'

export function SplashScreen() {
  const navigate = useNavigationStore((s) => s.navigate)
  const hasCompletedOnboarding = useSettingsStore((s) => s.hasCompletedOnboarding)

  const handleEnter = () => {
    navigate(hasCompletedOnboarding ? 'home' : 'onboarding')
  }

  return (
    <Layout title="" showHeader={false}>
      <div className="flex-1 flex flex-col items-center justify-between bg-green-50 px-6 py-12">
        <div />

        <div className="flex flex-col items-center gap-6">
          <img
            src="/logo_full.png"
            alt="GDD Tracker"
            className="w-48 h-48 object-contain drop-shadow-lg"
          />

          <div className="text-center space-y-2">
            <p className="text-gray-500 text-base max-w-xs leading-relaxed">
              Track Growing Degree Days and know exactly when to reapply your PGR.
            </p>
          </div>
        </div>

        <div className="w-full max-w-xs">
          <button
            onClick={handleEnter}
            className="w-full py-4 rounded-2xl bg-green-600 text-white text-lg font-bold active:bg-green-700 shadow-lg shadow-green-900/20 transition-colors"
          >
            Enter
          </button>
        </div>
      </div>
    </Layout>
  )
}
