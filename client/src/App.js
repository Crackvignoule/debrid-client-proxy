import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components';
import { Home, TorrentProgress, SavedLinks , Settings } from './pages';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/torrent-progress" element={<TorrentProgress />} />
          <Route path="/saved-links" element={<SavedLinks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;