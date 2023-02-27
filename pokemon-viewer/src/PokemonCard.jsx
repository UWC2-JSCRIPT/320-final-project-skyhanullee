import { useState } from "react";
import { Link } from "react-router-dom";

function PokemonCard({ pokemon }) {
  const [pokemonCardData, setPokemonCardData] = useState('');

  const { name, url } = pokemon;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
        setPokemonCardData(data);
      },
      (error) => {
        // console.log('Pokemon Card has error');
        console.log(error);
      }
    );

    console.log(pokemonCardData);

  return (
    <div>
      <Link to={`/pokemon/${pokemon.id}`} state={{ data: { pokemon } }}>
        <h3>{name}</h3>
      </Link>
    </div>
  )
}
export default PokemonCard
