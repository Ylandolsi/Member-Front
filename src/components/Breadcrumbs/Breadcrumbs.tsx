import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

export function Breadcrumbs() {
  const location = useLocation();

  // Parse the current path
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Map of route names to display names (can be expanded)
  const routeNameMap: Record<string, string> = {
    login: 'Login',
    register: 'Register',
    'my-posts': 'My Posts',
    'create-post': 'Create Post',
    // Add more route mappings as needed
  };

  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        // Build the path to this point
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        const displayName =
          routeNameMap[name] || name.charAt(0).toUpperCase() + name.slice(1);

        return (
          <span key={name}>
            <span className="separator">/</span>
            {isLast ? (
              <span className="current">{displayName}</span>
            ) : (
              <Link to={routeTo}>{displayName}</Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
