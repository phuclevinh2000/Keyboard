import { useState, useEffect } from 'react';
import { validateKeyPress } from '../utils/utils';

export const useKeyboardHandlers = (
  setInputText: (input: string | null) => void,
  inputText: string | null,
  setIsDarkMode: (isDarkMode: boolean) => void,
  isDarkMode: boolean
) => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (!activeKeys.includes(e.key)) {
        if (!validateKeyPress(e.key, inputText)) return;

        // Dark mode
        if (e.key === 'd' || e.key === 'D') {
          setActiveKeys((prev) => [...prev, 'd']);
          setIsDarkMode(!isDarkMode);
          return;
        }

        // Backspace
        if (e.key === 'Backspace') {
          setInputText(inputText ? inputText.slice(0, -1) : null);

          setActiveKeys((prev) => [...prev, 'backspace']);
          return;
        }

        setInputText((inputText || '') + e.key);

        setActiveKeys((prev) => [...prev, e.key]);
      }
    };

    const handleKeyUp = (e: KeyboardEvent): void => {
      if (e.key === 'Backspace') {
        setActiveKeys((prev) => prev.filter((key) => key !== 'backspace'));
        return;
      }

      if (e.key === 'D') {
        setActiveKeys((prev) => prev.filter((key) => key !== 'd'));
        return;
      }

      setActiveKeys((prev) => prev.filter((key) => key !== e.key));
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeKeys, setInputText, inputText, isDarkMode, setIsDarkMode]);

  return { activeKeys };
};
