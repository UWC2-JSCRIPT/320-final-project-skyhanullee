import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import JobPage from './JobPage';
import Navbar from './Navbar';
import HomePage from './HomePage';
import ThemeContext from './ThemeContext';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/job/:jobId' element={<JobPage />} />
      </Routes>
    </div>
  );
}

export default App;
