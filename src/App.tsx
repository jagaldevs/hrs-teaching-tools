import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Splash, shouldSkipSplash } from './components/Splash';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { BrainBreaks } from './pages/BrainBreaks';
import { ToolRouter } from './pages/ToolRouter';
import { GameRouter } from './pages/GameRouter';
import { About } from './pages/About';

/**
 * Brain Breaks is the headline product. Teacher Tools is the secondary
 * section, available at /tools. Old URLs (/dashboard, /brain-breaks)
 * redirect to the new home so existing bookmarks survive the pivot.
 */
function ChromedRoutes() {
  return (
    <>
      <Header />
      <Routes>
        {/* Primary: Brain Breaks landing */}
        <Route path="/" element={<BrainBreaks />} />
        <Route path="/brain-breaks" element={<Navigate to="/" replace />} />
        <Route path="/brain-breaks/:id" element={<GameRouter />} />

        {/* Secondary: Teacher Tools */}
        <Route path="/tools" element={<Dashboard />} />
        <Route path="/dashboard" element={<Navigate to="/tools" replace />} />
        <Route path="/tool/:id" element={<ToolRouter />} />

        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  const location = useLocation();

  // /splash always shows the splash (unless the user has dismissed it).
  if (location.pathname === '/splash') {
    if (shouldSkipSplash()) return <Navigate to="/" replace />;
    return (
      <Routes>
        <Route path="/splash" element={<Splash />} />
      </Routes>
    );
  }

  // First-time visit to / → bounce to splash.
  if (location.pathname === '/' && !shouldSkipSplash()) {
    return <Navigate to="/splash" replace />;
  }

  return <ChromedRoutes />;
}
