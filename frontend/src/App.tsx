import { useState, useEffect } from 'react';
import './App.scss';
import { MechanicalKeyboard } from './components/MechanicalKeyboard';
import VirtualScreen from './components/VirtualScreen';
import { ToastContainer } from 'react-toastify';
import Title from './components/Title';
import MobileKeyboard from './components/MobileKeyboard';

const App = () => {
  const [inputText, setInputText] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getInitialDarkMode = () => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode());

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      {windowWidth < 1000 ? (
        <MobileKeyboard
          setInputText={setInputText}
          inputText={inputText}
          setIsDarkMode={setIsDarkMode}
          isDarkMode={isDarkMode}
        />
      ) : (
        <div className='left-container'>
          <Title isDarkMode={isDarkMode} />
          <MechanicalKeyboard
            setInputText={setInputText}
            inputText={inputText}
            setIsDarkMode={setIsDarkMode}
            isDarkMode={isDarkMode}
          />
        </div>
      )}

      <VirtualScreen inputText={inputText} isDarkMode={isDarkMode} />
      <ToastContainer
        aria-label='Toast notifications'
        position='top-right'
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
