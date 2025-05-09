import { IconButton } from '@mui/material';
import './title.scss';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useState } from 'react';
import InstructionModal from '../InstructionModal';

const Title = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='title'>
      <div className={`title-first-line ${isDarkMode ? 'dark' : ''}`}>
        LET'S
      </div>
      <div className={`title-second-line ${isDarkMode ? 'dark' : ''}`}>
        T(YPE)9{' '}
        <IconButton
          aria-label='question-mark'
          style={{
            color: '#6C7691',
            width: '25px',
            height: '25px',
            borderRadius: '50%',
            border: `2px solid ${isDarkMode ? '#C9C9D5' : '#6C7691'}`,
            marginTop: '-10px',
          }}
          onClick={handleOpen}
        >
          <QuestionMarkIcon
            style={{
              fontSize: '16px',
              color: isDarkMode ? '#C9C9D5' : '#6C7691',
            }}
          />
        </IconButton>
      </div>
      <InstructionModal open={open} onClose={handleClose} />
    </div>
  );
};

export default Title;
