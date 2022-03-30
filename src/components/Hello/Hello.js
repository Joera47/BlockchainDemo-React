import { NavLink }  from 'react-router-dom';
import { sha256 }   from 'js-sha256';

export default function Hello() {
  const hashed = sha256('Message to hash');
  console.log(hashed);

  return (
    <div>
      <h4>Hello World!</h4>

      <NavLink exact={ true } activeClassName="is-active" to={ '/hello' }>
        To Derp Doggo
      </NavLink>
    </div>
  );
}