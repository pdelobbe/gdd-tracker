import { Layout } from '../components/Layout'
import { WeatherBadge } from '../components/WeatherBadge'
import { ApplicationCard } from '../components/ApplicationCard'
import { EmptyState } from '../components/EmptyState'
import { useApplications } from '../db/hooks'
import { useNavigationStore } from '../stores/useNavigationStore'
import { useNotificationChecker } from '../hooks/useNotificationChecker'

export function HomeDashboard() {
  const applications = useApplications()
  const navigate = useNavigationStore((s) => s.navigate)
  const activeApps = applications.filter((a) => a.isActive)
  useNotificationChecker(activeApps)

  return (
    <Layout title="GDD Tracker" showBack={false}>
      <div className="p-4 space-y-4">
        <WeatherBadge />

        {/* Seasonal GDD navigation */}
        <button
          onClick={() => navigate('historicalGDD')}
          className="w-full flex items-center gap-3 bg-white/80 rounded-xl p-3 border border-gray-200 active:bg-gray-50 transition-colors"
        >
          <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2f6e2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium text-gray-800">Seasonal GDD</p>
            <p className="text-xs text-gray-500">View cumulative growing degree days</p>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {activeApps.length === 0 ? (
          <EmptyState
            message="No active applications"
            description="Log your first PGR application to start tracking Growing Degree Days."
            ctaLabel="Log Application"
            onCta={() => navigate('logApp')}
          />
        ) : (
          <>
            {activeApps.map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
            <button
              onClick={() => navigate('logApp')}
              className="w-full py-3 rounded-xl bg-green-100 text-green-700 font-semibold active:bg-green-200 transition-colors"
            >
              + Log New Application
            </button>
          </>
        )}

        {applications.length > activeApps.length && (
          <div className="pt-2">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Past Applications</h3>
            {applications
              .filter((a) => !a.isActive)
              .map((app) => (
                <div key={app.id} className="opacity-60 mb-3">
                  <ApplicationCard application={app} />
                </div>
              ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
