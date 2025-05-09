import './mobileKeyboard.scss';
import { KEYBOARD_LAYOUT } from '../constants';
import Key2D from './Key2D';
import { useKeyboardHandlers } from '../../hooks/hooks';

interface MobileKeyboardProps {
  setInputText: React.Dispatch<React.SetStateAction<string | null>>;
  inputText: string | null;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
}

const MobileKeyboard = ({
  setInputText,
  inputText,
  setIsDarkMode,
  isDarkMode,
}: MobileKeyboardProps) => {
  const { activeKeys } = useKeyboardHandlers(
    setInputText,
    inputText,
    setIsDarkMode,
    isDarkMode
  );

  return (
    <div className='mobile-keyboard'>
      {KEYBOARD_LAYOUT.map((rowKeys, rowIndex) => (
        <div className='row' key={`row-${rowIndex}`}>
          {rowKeys.map((char) => {
            return (
              <Key2D
                key={`key-${char}-${rowIndex}`}
                char={char}
                active={activeKeys.includes(char)}
                isDarkMode={isDarkMode}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MobileKeyboard;
