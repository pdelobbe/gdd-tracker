import { useEffect } from 'react'
import { useNavigationStore } from './stores/useNavigationStore'
import { isSeeded, seedProducts } from './db/hooks'
import { SEED_PRODUCTS } from './db/seed'
import { SplashScreen } from './screens/SplashScreen'
import { OnboardingShell } from './screens/onboarding/OnboardingShell'
import { HomeDashboard } from './screens/HomeDashboard'
import { LogAppShell } from './screens/logapp/LogAppShell'
import { SettingsScreen } from './screens/SettingsScreen'
import { ProductListScreen } from './screens/ProductListScreen'
import { ProductDetailScreen } from './screens/ProductDetailScreen'
import { HistoricalGDDScreen } from './screens/HistoricalGDDScreen'

function App() {
  const screen = useNavigationStore((s) => s.screen)

  // Seed products on first launch
  useEffect(() => {
    isSeeded().then((seeded) => {
      if (!seeded) {
        seedProducts(SEED_PRODUCTS)
      }
    })
  }, [])

  switch (screen) {
    case 'splash':
      return <SplashScreen />
    case 'onboarding':
      return <OnboardingShell />
    case 'home':
      return <HomeDashboard />
    case 'logApp':
      return <LogAppShell />
    case 'settings':
      return <SettingsScreen />
    case 'productList':
      return <ProductListScreen />
    case 'productDetail':
      return <ProductDetailScreen />
    case 'historicalGDD':
      return <HistoricalGDDScreen />
    default:
      return <SplashScreen />
  }
}

export default App
