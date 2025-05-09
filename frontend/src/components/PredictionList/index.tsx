import { List } from '@mui/material';
import { ListItemText } from '@mui/material';
import { ListItem } from '@mui/material';
import PredictionListNote from './PredictionListNote';

export const PredictionList = ({
  predictions,
  inputText,
}: {
  predictions: string[];
  inputText: string | null;
}) => {
  return (
    <>
      {predictions.length > 0 && inputText ? (
        <>
          <PredictionListNote
            title={`You have ${predictions.length} predictions`}
          />
          <div className='prediction-list'>
            <List
              sx={{
                gap: '20px',
              }}
            >
              {predictions.map((prediction, index) => (
                <ListItem
                  key={index}
                  divider
                  sx={{ justifyContent: 'center', textAlign: 'center' }}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: { fontSize: 24 } }}
                    primary={prediction}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </>
      ) : (
        <PredictionListNote
          title={inputText ? 'No predictions found' : 'Type to see predictions'}
        />
      )}
    </>
  );
};
