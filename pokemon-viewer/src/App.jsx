import './App.css';
import { Route, Routes } from 'react-router-dom';
import PokemonApp from './PokemonApp';
import HomePage from './HomePage';
import PokemonPage from './PokemonPage';
import Navbar from './Navbar';
import PokedexPage from './PokedexPage';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/pokedex' element={<PokedexPage />} />
          <Route path='/pokemon/:pokemonId' element={<PokemonPage />} />
        </Routes>
    </div>
  );
}

export default App;
