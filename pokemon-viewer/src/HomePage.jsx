import PokemonViewer from "./PokemonViewer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function HomePage() {
  const [searchTerms, setSearchTerms] = useState('');
  const [location, setLocation] = useState('');

  const [pokemon, setPokemon] = useState('');
  const [pokemonId, setPokemonId] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);

  const [loading, toggleLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const onFormSubmit = (event) => {
    event.preventDefault();
    setSearchTerms(event.target[0].value);
    setLocation(event.target[1].value);
  }

  // useEffect(() => {
  //   fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  //   .then(response => response.json())
  //   .then(
  //     (data) => {
  //       // console.log(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${API_ID}&app_key=${API_KEY}&results_per_page=${resultsPerPage}&what=${searchTerms}&where=${location}`);
  //       setPokemonData(data);
  //       toggleLoading(false);
  //     },
  //     (error) => {
  //       toggleLoading(false);
  //       setHasError(true);
  //     }
  //   )
  // }, [pokemon]);

  const getPokemonData = (pokemon) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => response.json())
    .then((data) => {
        let tempId = (`00${data.id}`).slice(-3);
        setPokemonId(tempId)
        setPokemonData(data);
        toggleLoading(false);
      },
      (error) => {
        toggleLoading(false);
        setHasError(true);
      }
    )
  }

  if (loading) {
    return <p>loading...</p>
  }

  if (hasError) {
    return <p>Error</p>
  }

  <form onSubmit={onFormSubmit}>
    <div id='form-search-pokemon'>
      <label htmlFor='pokemon-search'>Search: </label>
      <input type='text' id='pokemon-search-input' placeholder='Pokemon' value={searchTerms} />
    </div>
  </form>

  return (
    <div className="">
      <header className="App-header">
        Pokemon Viewer
        <PokemonViewer />
      </header>
    </div>
  )
}
export default HomePage
