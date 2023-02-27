import PokemonViewer from "./PokemonViewer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
// import test_data from './data.json';

function HomePage() {
  const [searchTerms, setSearchTerms] = useState('bulbasaur');
  const [location, setLocation] = useState('');

  // const [pokemon, setPokemon] = useState('');
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonDataList, setPokemonDataList] = useState([]);

  const [loading, toggleLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [resultsPerPage, setResultsPerPage] = useState();

  console.log(pokemonData);

  const onFormSubmit = (event) => {
    event.preventDefault();
    setSearchTerms(event.target[0].value);
    // getPokemonData(searchTerms);
    // event.target[0].value = '';
  }

  // useEffect(() => {
  //   fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerms}`)
  //   .then(response => response.json())
  //   .then((data) => {
  //       setPokemonData(data);
  //       toggleLoading(false);
  //     },
  //     (error) => {
  //       toggleLoading(false);
  //       setHasError(true);
  //     }
  //   )
  // }, [searchTerms]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${resultsPerPage}&offset=0`)
    .then(response => response.json())
    .then((data) => {
      // console.log(data);
      setPokemonDataList(data);
      // console.log(pokemonDataList);
        toggleLoading(false);
      },
      (error) => {
        toggleLoading(false);
        setHasError(true);
      }
    )
  }, [resultsPerPage]);

  if (loading) {
    return <p>loading...</p>
  }

  if (hasError) {
    return <p>Error</p>
  }

  const pokemonArray = pokemonDataList.results.map((pokemon, index) => {
    // console.log(pokemon.name);
    return (
      <li key={index}>
        {/* <Link to={`/pokemon/${pokemon.id}`} state={{ data: { pokemon } }}> */}
          <PokemonCard pokemon={pokemon} />
        {/* </Link> */}
      </li>
    )
  })


  return (
    <div className="">
      <header className="App-header">
        Pokemon Viewer
        <form onSubmit={onFormSubmit}>
          <div id='form-search-pokemon'>
            <label htmlFor='pokemon-search'>Search: </label>
            <input type='text' id='pokemon-search-input' placeholder='Pokemon'/>
          </div>
          <div id='form-results-per-page'>
            <label htmlFor='job-search'>Results per page: </label>
            <input type='number' id='results_per_page-input' min='1' defaultValue='4' value={resultsPerPage} />
          </div>
          <button type='submit'>
          Search
            {/* <Icon icon='material-symbols:search-rounded' className='search-icon' /> */}
          </button>
        </form>
      </header>
      {/* <PokemonViewer pokemonData={pokemonData} /> */}
      <section className="pokemon-card-container">
        <ul>
          {pokemonArray}
        </ul>
      </section>
    </div>
  )
}
export default HomePage
