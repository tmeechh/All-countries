import { Home } from './pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParentComponent from './pages/ParentComponent';


const App = () => {
  return (
    <Router>
      <div className='z-10 relative'>
        <Navbar />
        </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:name" element={<ParentComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
