import { useAuth } from '../../../Contexts/AuthContext';
import './LoggedHome.scss';

export function LoggedHome() {
  const { user, logout } = useAuth();

  return (
    <div className="logged-home">
      <h1>Welcome, {user?.username || 'Member'}!</h1>
      <p>You are now logged into the private application</p>

      <div className="dashboard">
        <h2>Your Dashboard</h2>
        {/* Add user-specific content here */}
      </div>

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}
