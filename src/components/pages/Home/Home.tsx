import { useAuth } from '../../Contexts/AuthContext';
import { LoggedHome } from './Logged/LoggedHome';
import { UnloggedHome } from './Unlogged/UnloggedHome';

export function Home() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <LoggedHome /> : <UnloggedHome />;
}
