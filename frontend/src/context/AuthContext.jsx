import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    api.getMe()
      .then(async (userData) => {
        // For club heads, find their club ID from the clubs list so pages can use it
        if (userData.role === 'club_head') {
          try {
            const clubs = await api.getClubs();
            const myClub = clubs.find((c) => c.club_head_name === userData.name);
            setUser({ ...userData, clubId: myClub?.id ?? null });
          } catch {
            setUser(userData);
          }
        } else {
          setUser(userData);
        }
      })
      .catch(() => {
        api.clearToken();
        setUser(null);
      })
      .finally(() => setAuthLoading(false));
  }, []);

  function logout() {
    api.clearToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, authLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
