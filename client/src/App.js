import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components';
import { Settings } from './pages';
import { Home } from './pages';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;