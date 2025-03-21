import { Link } from 'react-router-dom';

const Nav = () => {
  const currentPage = window.location.pathname;
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav className='nav text-left fixed-top'>
        <Link to="/"
        className={currentPage === '/' ? 'nav-link active' : 'nav-link'} >Home</Link>
        <Link to="/SavedCandidates"className={currentPage === '/SavedCandidates' ? 'nav-link active' : 'nav-link'}> Saved Candidates</Link>
    </nav>
  )
};

export default Nav;
