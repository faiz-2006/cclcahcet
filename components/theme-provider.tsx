"use client";

import { createContext, ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

// Create a context for theme (though we'll only use light theme)
export const ThemeContext = createContext({
  theme: "light",
});

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Since we're only using light theme, we don't need state management
  const theme = "light";

  return (
    <ThemeContext.Provider value={{ theme }}>
      {/* Apply light theme class to the HTML element */}
      <div className="light" style={{ colorScheme: "light" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}