import { useEffect, useState, useCallback } from 'react';
import './virtualScreen.scss';
import axios from 'axios';
import { debounce } from 'lodash';
import { SEARCH_TYPE } from '../constants';
import { toast } from 'react-toastify';
import { PredictionList } from '../PredictionList';
import Loading from '../Loading';
import Error from '../Error';

interface VirtualScreenProps {
  inputText: string | null;
  isDarkMode: boolean;
}

const VirtualScreen = ({ inputText, isDarkMode }: VirtualScreenProps) => {
  const [predictions, setPredictions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPredictions = useCallback(() => {
    if (!inputText) {
      setPredictions([]);
      return;
    }

    setError(null);
    setLoading(true);

    const lastSearchCharacter = inputText.slice(-1);
    const searchType =
      lastSearchCharacter === '0'
        ? `${SEARCH_TYPE.EXACT}/${inputText.slice(0, -1)}`
        : `${SEARCH_TYPE.PREFIX}/${inputText}`;

    axios
      .get(`http://localhost:3001/search/${searchType}`)
      .then((response) => {
        setPredictions(response.data.words);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.data?.error) {
          setError(err.response.data.error);
          toast.error(err.response.data.error);
        } else {
          setError('Failed to fetch predictions');
          toast.error('Unknown error');
        }
        console.error('Error fetching predictions:', err);
        setLoading(false);
      });
  }, [inputText]);

  // Debounced call for inputText changes
  useEffect(() => {
    const debouncedFetch = debounce(fetchPredictions, 500);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [inputText, fetchPredictions]);

  const handleReload = () => {
    fetchPredictions();
  };

  return (
    <div className={`virtual-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className='virtual-screen-message'>{inputText}</div>

      {loading ? (
        <Loading loadingText='Loading predictions...' />
      ) : error && inputText ? (
        <Error
          errorText='Prediction failed. Type more or click the reload button to reload.'
          handleReload={handleReload}
        />
      ) : (
        <PredictionList predictions={predictions} inputText={inputText} />
      )}
    </div>
  );
};

export default VirtualScreen;
