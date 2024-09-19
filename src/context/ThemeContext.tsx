/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';
import { StyleSheetType } from '@context/Types';

/**
 * Represents the type of the ThemeContext.
 */
interface ThemeContextType {
  theme: string; // The current theme.
  style?: StyleSheetType; // The optional style object.
  toggleTheme: (a: unknown) => void; // A function to toggle the theme.
}

/**
 * The default value for the ThemeContext.
 */
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  style: {},
  toggleTheme: () => {},
});
