import { toast } from 'react-toastify';
import { MAX_INPUT_LENGTH } from '../components/constants';

export const validateKeyPress = (
  key: string,
  inputText: string | null
): boolean => {
  // Check if 0 is first character
  if (key === '0' && !inputText) {
    toast.warning('0 cannot be the first character');
    return false;
  }

  // Validate max input length
  if ((inputText?.length ?? 0) >= MAX_INPUT_LENGTH) {
    toast.warning('Has reached max input length');
    return false;
  }

  // Check if number, backspace, or 'd', 'D'
  if (!/^\d$/.test(key) && key !== 'Backspace' && key !== 'd' && key !== 'D') {
    return false;
  }

  return true;
};
