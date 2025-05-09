import { Box, Fade, Backdrop, Typography, Modal, Divider } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  color: '#000',
  p: 4,
};

const InstructionModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant='h6' gutterBottom>
            📱 Typing Instructions
          </Typography>

          <Typography variant='body1' sx={{ mb: 2 }}>
            You can use your keyboard to enter numeric input, and the results
            will provide the matching words.
          </Typography>

          <Typography variant='body2' sx={{ mb: 2 }}>
            Examples:
            <ul>
              <li>
                <code>4663</code> → <code>gone</code>
              </li>
              <li>
                <code>4663</code> → <code>hoof</code>
              </li>
              <li>
                <code>46633367483</code> → <code>inoffensive</code>
              </li>
            </ul>
          </Typography>

          <Typography variant='subtitle1' gutterBottom>
            🔍 Matching Modes
          </Typography>
          <Typography variant='body2'>
            <ul>
              <li>
                <strong>Default (Prefix Matching):</strong> Shows all words that{' '}
                <em>start with</em> the typed T9 sequence.
              </li>
              <li>
                <strong>Strict Matching:</strong> Add <code>0</code> at the end
                to match words that <em>exactly match</em> the sequence.
              </li>
            </ul>
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant='h6' gutterBottom>
            🌓 Theme Toggle
          </Typography>
          <Typography variant='body1'>
            Press <strong>d</strong> to switch between <strong>Light</strong>{' '}
            and <strong>Dark</strong> modes.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant='h6' gutterBottom>
            ⚠️ Notes
          </Typography>
          <Typography variant='body2'>
            <ul>
              <li>
                Input must <strong>not</strong> start with <code>0</code>.
              </li>
              <li>
                Maximum input length is <strong>50 digits</strong>.
              </li>
            </ul>
          </Typography>

          <Typography variant='caption' color='text.secondary'>
            Need help or more information? Please contact <strong>Phuc</strong>.
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default InstructionModal;
