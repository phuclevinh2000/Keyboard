import './mechanicalKeyboard.scss';
import { KEYBOARD_LAYOUT } from '../constants';
import Key3D from './Key3D';
import { useKeyboardHandlers } from '../../hooks/hooks';

interface MechanicalKeyboardProps {
  setInputText: React.Dispatch<React.SetStateAction<string | null>>;
  inputText: string | null;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
}

export const MechanicalKeyboard = ({
  setInputText,
  inputText,
  setIsDarkMode,
  isDarkMode,
}: MechanicalKeyboardProps) => {
  const { activeKeys } = useKeyboardHandlers(
    setInputText,
    inputText,
    setIsDarkMode,
    isDarkMode
  );

  return (
    <div className='keyboard'>
      <div className='column'>
        {KEYBOARD_LAYOUT.map((rowKeys, rowIndex) => (
          <div className='row' key={`row-${rowIndex}`}>
            {rowKeys.map((char) => (
              <Key3D
                key={`key-${char}-${rowIndex}`}
                char={char}
                active={activeKeys.includes(char)}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        ))}
      </div>

      <div className={`cover ${isDarkMode ? 'dark' : ''}`}></div>
    </div>
  );
};
