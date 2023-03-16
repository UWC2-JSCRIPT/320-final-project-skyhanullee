import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import JobPage from './JobPage';
import Navbar from './Navbar';
import HomePage from './HomePage';
import ThemeContext, { ThemeController } from './ThemeContext';
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

function App() {
  const { themeName } = useContext(ThemeContext);
  console.log(`the theme from App is ${themeName}`);

  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
  });

  return (
    // <div className='App' data-theme={themeName}>
    // <ThemeController>
      <div className={`App ${themeName}`}>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/job/:jobId' element={<JobPage />} />
        </Routes>
      </div>
    // </ThemeController>
  );
}

export default App;
