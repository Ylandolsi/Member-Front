import { Link, useNavigate } from 'react-router-dom';
import './Unlogged.scss';
export function UnloggedHome() {
  return (
    <div className="unlogged-home">
      <h1>Welcome to Members Only!</h1>
      <p>This is a private application for members only.</p>
      <p>Please log in to continue.</p>
      <div className="login-buttons">
        <button>
          {' '}
          <Link to="/login">Login</Link>
        </button>
        <button>
          {' '}
          <Link to="/Register">Register</Link>
        </button>
      </div>
    </div>
  );
}
