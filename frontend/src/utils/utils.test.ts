import { validateKeyPress } from './utils';
import { toast } from 'react-toastify';
import { MAX_INPUT_LENGTH } from '../components/constants';

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    warning: jest.fn(),
  },
}));

describe('validateKeyPress', () => {
  beforeEach(() => {
    // Clear mock calls between tests
    jest.clearAllMocks();
  });

  it('should return false when 0 is first character', () => {
    const result = validateKeyPress('0', null);

    expect(result).toBe(false);
    expect(toast.warning).toHaveBeenCalledWith(
      '0 cannot be the first character'
    );
  });

  it('should return true when 0 is not first character', () => {
    const result = validateKeyPress('0', '1');

    expect(result).toBe(true);
    expect(toast.warning).not.toHaveBeenCalled();
  });

  it('should return false when input length reaches maximum', () => {
    const longInput = '1'.repeat(MAX_INPUT_LENGTH);
    const result = validateKeyPress('1', longInput);

    expect(result).toBe(false);
    expect(toast.warning).toHaveBeenCalledWith('Has reached max input length');
  });

  it('should return true for valid digits', () => {
    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    digits.forEach((digit) => {
      const result = validateKeyPress(digit, '123');
      expect(result).toBe(true);
    });
  });

  it('should return true for valid special keys', () => {
    const specialKeys = ['Backspace', 'd'];

    specialKeys.forEach((key) => {
      const result = validateKeyPress(key, '123');
      expect(result).toBe(true);
    });
  });

  it('should return false for invalid keys', () => {
    const invalidKeys = ['a', 'x', 'Space', 'Enter', '@', '!'];

    invalidKeys.forEach((key) => {
      const result = validateKeyPress(key, '123');
      expect(result).toBe(false);
    });
  });
});
