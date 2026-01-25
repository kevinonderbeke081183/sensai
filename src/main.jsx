import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import InventoryApp from './InventoryApp.jsx'
import LandingPage from './LandingPage.jsx'

function Root() {
  const [appMode, setAppMode] = useState('landing'); // 'landing', 'trends', 'inventory'

  useEffect(() => {
    // Check URL hash or query param for direct app access
    const hash = window.location.hash;
    const params = new URLSearchParams(window.location.search);
    const appParam = params.get('app');

    if (hash === '#app' || appParam === 'true' || appParam === 'trends') {
      setAppMode('trends');
    } else if (appParam === 'inventory') {
      setAppMode('inventory');
    }
  }, []);

  const handleEnterApp = (mode = 'trends') => {
    setAppMode(mode);
    window.history.pushState({}, '', `?app=${mode}`);
  };

  const handleBackToLanding = () => {
    setAppMode('landing');
    window.history.pushState({}, '', '/');
  };

  if (appMode === 'trends') {
    return <App onBackToLanding={handleBackToLanding} />;
  }

  if (appMode === 'inventory') {
    return <InventoryApp onBackToLanding={handleBackToLanding} />;
  }

  return <LandingPage onEnterApp={handleEnterApp} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
