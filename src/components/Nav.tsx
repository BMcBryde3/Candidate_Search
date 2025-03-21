import { Link } from 'react-router-dom';

const Nav = () => {
  const currentPage = window.location.pathname;
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav>
    <ul>
      <li>
        <Link to="/"
        className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
        >Home</Link>
      </li>
      <li>
        <Link to="/SavedCandidates"
        className={currentPage === '/SavedCandidates' ? 'nav-link active' : 'nav-link'}>
          Saved Candidates</Link>
      </li>
    </ul>
</nav>
  )
};

export default Nav;
