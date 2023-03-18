import { Link } from 'react-router-dom'
import adzunaIcon from './images/adzuna.svg';
import Button from './Button';

function Navbar() {
  return (
    <header>
      <nav className='top-nav'>
        <div className="nav-title-container">
          <img src={adzunaIcon} alt='adzuna logo' id='adzuna-icon'/>
          <h2 id='nav-title'>Job Search via Adzuna</h2>
        </div>
        <ul className='links-container'>
          <li className="nav-link" id='home-link'>
            <Link to='/'>Home</Link>
          </li>
          <li className="nav-link" id="sign-in-link">Sign In</li>
          {/* <li className="nav-link" id="theme-toggle">Theme</li> */}
          <li className="nav-link" id="theme-toggle"><Button /></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
