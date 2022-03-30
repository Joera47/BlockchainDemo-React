import { NavLink } from 'react-router-dom';

export default function Hello() {
  return (
    <div>
      <h4>Hello World!</h4>

      <NavLink exact={ true } activeClassName="is-active" to={ '/hello' }>
        To Derp Doggo
      </NavLink>
    </div>
  );
}