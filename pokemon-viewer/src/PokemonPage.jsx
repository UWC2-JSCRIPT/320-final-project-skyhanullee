import './PokemonPage.css';
import { useLocation, useParams } from 'react-router-dom';

function PokemonPage() {
  // const { pokemonId } = useParams();
  const dataLocation = useLocation();

  const pokemonObject = dataLocation.state?.data;

  const { name, id, sprites, abilities, types, stats } = pokemonObject.pokemonData;

  const abilityList = abilities.map((ability, index) => {
    return (
      <li key={index}>
        {ability.ability.name}
      </li>
    )
  })

  const typeList = types.map((type, index) => {
    return (
      <li key={index} className='pokemon-type'>
        {type.type.name}
      </li>
    )
  })

  const statsList = stats.map((stat, index) => {
    return (
      <li key={index}>
        {stat.stat.name}: {stat.base_stat}
      </li>
    )
  })


  return (
    <section>
      <div className="pokemon-image-container">
        <img src={sprites.other['official-artwork']['front_default']} alt={`${name}'s official artwork`} />
      </div>
      
      <div className="pokemon-details">
        <div className="pokemon-title">
          <h1>Name: {name}</h1>
          <h2>ID: {id}</h2>
        </div>
        <div className="pokemon-types">
          {typeList}
        </div>
        <div className="pokemon-abilities">
          <h2>Ability List</h2>
          {abilityList}
        </div>
        <div className="pokemon-stats">
          <h2>Stats</h2>
          {statsList}
        </div>
      </div>
    </section>
  )
}
export default PokemonPage
