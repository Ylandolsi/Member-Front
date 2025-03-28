import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { APIURL } from '../../api.tsx';

interface AuthContextType {
  isLoggedIn: boolean;
  user: any | null;
  login: (tokens: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);

  const refreshToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    console.log('refresh token func', refreshToken, user);
    if (refreshToken && user) {
      fetch(`${APIURL}/Auth/refresh-token`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: user,
          refreshToken: refreshToken,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Invalid refresh token');
        })
        .then((data) => {
          console.log('data', data);
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
        })
        .catch((error) => {
          console.error('Refresh token failed:', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        });
    }
  };

  const verifyTokenGetClaims = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      fetch(`${APIURL}/Auth/validate`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          console.log('res');
          if (res.ok) {
            return res.json();
          }
          throw new Error('Invalid token');
        })
        .then((data) => {
          console.log('data', data);

          setUser(data.username);
          console.log('setUser', data.username);

          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error('Token validation failed:', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setIsLoggedIn(false);
          setUser(null);
        });
    }
  };
  useEffect(() => {
    verifyTokenGetClaims();
  }, []);

  const login = (tokens: { accessToken: string; refreshToken: string }) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    console.log('verifyTokenGetClaims');
    verifyTokenGetClaims();
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        refreshToken();
      },
      1000 * 60 * 5
    );
    // Refresh token every 5 minutes
    return () => clearInterval(interval);
  }, [user]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
