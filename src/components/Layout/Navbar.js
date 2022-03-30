import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger px-4">
      <a className="navbar-brand text-white fweight-600" href="#">Joey's Blockchain Demo</a>

      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item px-2">
            <NavLink exact={ true } className="nav-link text-grey" activeClassName="text-white" to={ '/hello' }>
              Derp
            </NavLink>
          </li>

          <li className="nav-item px-2">
            <NavLink exact={ true } className="nav-link text-grey" activeClassName="text-white" to={ '/' }>
              Hello
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}