// App.js - Adapter file for Expo Snack compatibility
import { registerRootComponent } from 'expo';

// Import your actual app entry point
import App from './app/_layout';

// Export and register your app
export default function AppWrapper() {
  return <App />;
}

// This ensures the app is registered properly for Expo
registerRootComponent(AppWrapper);