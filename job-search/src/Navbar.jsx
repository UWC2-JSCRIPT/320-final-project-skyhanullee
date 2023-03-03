import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import adzunaIcon from './adzuna.svg';

function Navbar() {
  return (
    <header>
      <nav className='top-nav'>
        <ul className='links-container'>
          <li id='home-button'>
            <Link to='/'>
              <Icon icon='material-symbols:home' id='home-icon' />
            </Link>
          </li>
        </ul>
        <h2 id='nav-title'>Job Search via Adzuna</h2><img src={adzunaIcon} alt='adzuna logo' id='adzuna-icon'/>
      </nav>
    </header>
  )
}

export default Navbar
