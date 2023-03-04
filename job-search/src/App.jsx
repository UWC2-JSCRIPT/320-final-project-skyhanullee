import './App.css';
import { Route, Routes } from 'react-router-dom';
import JobPage from './JobPage';
import Navbar from './Navbar';
import HomePage from './HomePage';
import MapPage from './MapPage';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/' element={<HomePage />} />
        <Route path='/job/:jobId' element={<JobPage />} />
      </Routes>
    </div>
  );
}

export default App;
