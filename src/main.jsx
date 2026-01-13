import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LandingPage from './LandingPage.jsx'

function Root() {
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    // Check URL hash or query param for direct app access
    const hash = window.location.hash;
    const params = new URLSearchParams(window.location.search);
    if (hash === '#app' || params.get('app') === 'true') {
      setShowApp(true);
    }
  }, []);

  const handleEnterApp = () => {
    setShowApp(true);
    window.history.pushState({}, '', '?app=true');
  };

  const handleBackToLanding = () => {
    setShowApp(false);
    window.history.pushState({}, '', '/');
  };

  if (showApp) {
    return <App onBackToLanding={handleBackToLanding} />;
  }

  return <LandingPage onEnterApp={handleEnterApp} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
