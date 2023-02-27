import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="top-nav">
      <Link to={'/'}>Home</Link>
      <Link to={'/pokedex'}>Pokedex</Link>
    </nav>
  )
}
export default Navbar
