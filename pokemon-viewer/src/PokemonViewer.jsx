import { Link } from "react-router-dom";

function PokemonViewer({ pokemonData }) {
  const { name, id, sprites } = pokemonData;
  // console.log(sprites.other['official-artwork']);

  return (
    <section className="pokemon-viewer-container">
      <h1>Name: {name}</h1>
      <h2>ID: {id}</h2>
      {/* <img src={sprites.front_default} alt={`${name}'s sprite`} /> */}
      <Link to={`pokemon/${id}`} state={{ data: { pokemonData } }}>
        <img src={sprites.other['official-artwork']['front_default']} alt={`${name}'s official artwork`} />
      </Link>
    </section>
  )
}
export default PokemonViewer
