import NightsStayIcon from '@mui/icons-material/NightsStay';
import BackspaceIcon from '@mui/icons-material/Backspace';
import SunnyIcon from '@mui/icons-material/Sunny';
import './key2D.scss';

import { T9_KEY_MAPPINGS, T9Key } from '../../constants';

export interface KeyProps {
  char: T9Key;
  span?: boolean;
  active: boolean;
  isDarkMode: boolean;
}

const Key2D = ({ char, active, isDarkMode }: KeyProps) => {
  const letters = T9_KEY_MAPPINGS[char] || [];
  const isNumberKey = !['d', 'backspace'].includes(char);
  const isDarkKey = char === 'd';
  const isBackspaceKey = char === 'backspace';

  return (
    <div
      className={`key2D ${active ? 'active' : ''} ${isDarkMode ? 'dark' : ''}`}
    >
      <div className='char'>
        <div className='number'>
          {isDarkKey ? (
            isDarkMode ? (
              <SunnyIcon
                sx={{
                  fontSize: 45,
                  marginTop: '7px',
                  color: '#f3e84f',
                }}
              />
            ) : (
              <NightsStayIcon
                sx={{
                  fontSize: 45,
                  marginTop: '5px',
                  marginLeft: '7px',
                  color: '#727CD4',
                }}
              />
            )
          ) : isBackspaceKey ? (
            <BackspaceIcon sx={{ fontSize: 40, marginTop: '7px' }} />
          ) : (
            char
          )}
        </div>
        <div>
          {isNumberKey && (
            <div className='letters'>
              {letters.map((letter, index) => (
                <span key={index}>{letter}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Key2D;
