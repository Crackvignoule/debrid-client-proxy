import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components';
import { Home, PendingTorrents, SavedLinks, History, Settings } from './pages';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/pending-torrents" element={<PendingTorrents />} />
          <Route path="/saved-links" element={<SavedLinks />} />
          <Route path="/history" element={<History />} />
          {/* <Route path="*" element={<h1>Not Found</h1>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;