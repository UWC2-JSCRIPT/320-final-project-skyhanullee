import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import JobPage from './JobPage';
import Navbar from './Navbar';
import HomePage from './HomePage';
import ThemeContext, { ThemeController } from './ThemeContext';

function App() {
  const { themeName } = useContext(ThemeContext);

  return (
    <div className='App' data-theme={themeName}>
      <ThemeController>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/job/:jobId' element={<JobPage />} />
        </Routes>
      </ThemeController>
    </div>
  );
}

export default App;
