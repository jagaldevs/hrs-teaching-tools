import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Splash, shouldSkipSplash } from './components/Splash';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { BrainBreaks } from './pages/BrainBreaks';
import { ToolRouter } from './pages/ToolRouter';
import { GameRouter } from './pages/GameRouter';
import { About } from './pages/About';

function ChromedRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brain-breaks" element={<BrainBreaks />} />
        <Route path="/brain-breaks/:id" element={<GameRouter />} />
        <Route path="/tool/:id" element={<ToolRouter />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  const location = useLocation();
  const onSplash = location.pathname === '/' || location.pathname === '/splash';

  if (onSplash) {
    if (shouldSkipSplash()) return <Navigate to="/dashboard" replace />;
    return (
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/splash" element={<Splash />} />
      </Routes>
    );
  }

  return <ChromedRoutes />;
}
