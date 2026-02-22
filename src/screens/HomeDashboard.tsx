import { Layout } from '../components/Layout'
import { WeatherBadge } from '../components/WeatherBadge'
import { ApplicationCard } from '../components/ApplicationCard'
import { EmptyState } from '../components/EmptyState'
import { useApplications } from '../db/hooks'
import { useNavigationStore } from '../stores/useNavigationStore'

export function HomeDashboard() {
  const applications = useApplications()
  const navigate = useNavigationStore((s) => s.navigate)
  const activeApps = applications.filter((a) => a.isActive)

  return (
    <Layout title="GDD Tracker" showBack={false}>
      <div className="p-4 space-y-4">
        <WeatherBadge />

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
