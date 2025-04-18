import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useNavigation } from 'expo-router';

type NavigationContextType = {
  navigationHistory: string[];
  addToHistory: (route: string) => void;
  removeLastFromHistory: () => string | undefined;
  clearHistory: () => void;
  getPreviousRoute: () => string | undefined;
};

const NavigationContext = createContext<NavigationContextType>({
  navigationHistory: [],
  addToHistory: () => {},
  removeLastFromHistory: () => undefined,
  clearHistory: () => {},
  getPreviousRoute: () => undefined,
});

export const useNavigationContext = () => useContext(NavigationContext);

type NavigatorProps = {
  children: ReactNode;
};

export const Navigator: React.FC<NavigatorProps> = ({ children }) => {
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);

  const addToHistory = useCallback((route: string) => {
    setNavigationHistory((prev) => [...prev, route]);
  }, []);

  const removeLastFromHistory = useCallback(() => {
    let removedRoute: string | undefined;
    setNavigationHistory((prev) => {
      if (prev.length === 0) return prev;
      removedRoute = prev[prev.length - 1];
      return prev.slice(0, -1);
    });
    return removedRoute;
  }, []);

  const clearHistory = useCallback(() => {
    setNavigationHistory([]);
  }, []);

  const getPreviousRoute = useCallback(() => {
    if (navigationHistory.length < 2) return undefined;
    return navigationHistory[navigationHistory.length - 2];
  }, [navigationHistory]);

  return (
    <NavigationContext.Provider
      value={{
        navigationHistory,
        addToHistory,
        removeLastFromHistory,
        clearHistory,
        getPreviousRoute,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default Navigator;