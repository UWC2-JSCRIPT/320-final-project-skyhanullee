import './App.css';
import { Route, Routes } from 'react-router-dom';
import PokemonApp from './PokemonApp';
import HomePage from './HomePage';
import PokemonPage from './PokemonPage';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/pokemon/:pokemonId' element={<PokemonPage />} />
        </Routes>
    </div>
  );
}

export default App;
