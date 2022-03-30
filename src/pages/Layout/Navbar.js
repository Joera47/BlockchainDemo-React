import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const pages = [
    { name: 'Hash',         path: '/' },
    { name: 'Block',        path: '/block' },
    { name: 'Blockchain',   path: '/blockchain' },
    { name: 'Distributed',  path: '/distributed' },
    { name: 'Tokens',       path: '/tokens' },
    { name: 'Coinbase',     path: '/coinbase' }
  ];

  const displayedLinks = pages.map((hash, index) => {
    return (
      <li key={ index } className="nav-item px-2">
        <NavLink exact={ true } className="nav-link text-grey" activeClassName="text-white" to={ hash.path }>
          { hash.name }
        </NavLink>
      </li>
    )
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger px-4">
      <h4 className="navbar-brand text-white fweight-600 mb-0">Joey's Blockchain Demo</h4>

      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">{ displayedLinks }</ul>
      </div>
    </nav>
  );
}