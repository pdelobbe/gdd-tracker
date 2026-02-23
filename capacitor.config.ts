import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.lawnlab.gddtracker',
  appName: 'GDD Tracker',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      autoHideDelay: 500,
    },
  },
}

export default config
