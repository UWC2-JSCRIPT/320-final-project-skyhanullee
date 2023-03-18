import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import JobPage from './JobPage';
import Navbar from './Navbar';
import HomePage from './HomePage';
import SignInPage from './SignInPage';
import ThemeContext, { ThemeController } from './ThemeContext';

function App() {
  const { themeName } = useContext(ThemeContext);
  console.log(`the theme from App is ${themeName}`);

  return (
    // <div className='App' data-theme={themeName}>
    // <ThemeController>
      <div className={`App ${themeName}`}>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/job/:jobId' element={<JobPage />} />
          {/* <Route path='/signin' element={<SignInPage />} /> */}
        </Routes>
      </div>
    // </ThemeController>
  );
}

export default App;
