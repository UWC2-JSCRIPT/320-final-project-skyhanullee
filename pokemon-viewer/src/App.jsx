import './App.css';
import { Route, Routes } from 'react-router-dom';
import PokemonApp from './PokemonApp';
import HomePage from './HomePage';
import PokemonPage from './PokemonPage';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/pokedex' element={<PokemonPage />} />
          <Route path='/pokemon/:pokemonId' element={<PokemonPage />} />
        </Routes>
    </div>
  );
}

export default App;
