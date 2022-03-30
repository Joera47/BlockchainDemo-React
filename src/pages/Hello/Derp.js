import { NavLink } from 'react-router-dom';

export default function Hello() {
  return (
    <div>
      <h4>Derp Doggo!</h4>

      <NavLink exact={ true } activeClassName="is-active" to={ '/' }>
        To Hello World
      </NavLink>
    </div>
  );
}