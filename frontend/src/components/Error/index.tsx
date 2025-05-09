import errorIcon from '../../assets/icons/error.png';
import { Button } from '@mui/material';
import './error.scss';

const Error = ({
  errorText,
  handleReload,
}: {
  errorText: string;
  handleReload: () => void;
}) => {
  return (
    <div className='error-container'>
      <div className='error-icon'>
        <img src={errorIcon} alt='error' height={40} width={40} />
      </div>
      <div className='error-content'>
        <div className='error-title'>Error</div>
        <div className='error-description'>{errorText}</div>
        <Button variant='contained' color='error' onClick={handleReload}>
          Reload
        </Button>
      </div>
    </div>
  );
};

export default Error;
