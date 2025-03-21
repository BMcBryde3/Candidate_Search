import { Link } from 'react-router-dom';

const Nav = () => {
  const currentPage = window.location.pathname;
  return (
    <nav className='nav justify-content'>
      <ul className='nav'>
        <li className='nav-item'>
          <Link to="/" className={currentPage === '/' ? 'nav-link active' : 'nav-link'}>Home</Link>
        </li>
        <li className='nav-item'>
          <Link to="/SavedCandidates" className={currentPage === '/SavedCandidates' ? 'nav-link active' : 'nav-link'}>Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav; 

