import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Stats from './pages/Stats';
import RedirectPage from './pages/RedirectPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/shorten" />} />
      <Route path="/shorten" element={<Home />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/:shortcode" element={<RedirectPage />} />
    </Routes>
  );
}

export default App;