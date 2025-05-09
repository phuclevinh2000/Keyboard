import { renderHook, act } from '@testing-library/react';
import { useKeyboardHandlers } from './hooks';

describe('useKeyboardHandlers', () => {
  const mockSetInputText = jest.fn();
  const mockSetIsDarkMode = jest.fn();

  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle numeric key press correctly', () => {
    const { result } = renderHook(() =>
      useKeyboardHandlers(mockSetInputText, null, mockSetIsDarkMode, false)
    );

    // Simulate pressing '1' key
    act(() => {
      const keyDownEvent = new KeyboardEvent('keydown', { key: '2' });
      document.dispatchEvent(keyDownEvent);
    });

    expect(result.current.activeKeys).toContain('2');

    // Simulate releasing '1' key
    act(() => {
      const keyUpEvent = new KeyboardEvent('keyup', { key: '2' });
      document.dispatchEvent(keyUpEvent);
    });

    expect(result.current.activeKeys).not.toContain('1');
  });

  it('should handle backspace key press correctly', () => {
    let inputText = '123';
    const mockSetInputText = jest.fn((newValue) => {
      // mock inputText useState (helped by chat gpt)
      if (typeof newValue === 'function') {
        inputText = newValue(inputText);
      } else {
        inputText = newValue;
      }
    });

    const { result } = renderHook(() =>
      useKeyboardHandlers(mockSetInputText, inputText, mockSetIsDarkMode, false)
    );

    // Simulate pressing Backspace key
    act(() => {
      const keyDownEvent = new KeyboardEvent('keydown', { key: 'Backspace' });
      document.dispatchEvent(keyDownEvent);
    });

    expect(result.current.activeKeys).toContain('backspace');

    expect(mockSetInputText).toHaveBeenCalled();
    expect(inputText).toBe('12');

    act(() => {
      const keyUpEvent = new KeyboardEvent('keyup', { key: 'Backspace' });
      document.dispatchEvent(keyUpEvent);
    });

    expect(result.current.activeKeys).not.toContain('backspace');
  });

  it('should prevent 0 as first character', () => {
    renderHook(() =>
      useKeyboardHandlers(mockSetInputText, null, mockSetIsDarkMode, false)
    );

    act(() => {
      const keyDownEvent = new KeyboardEvent('keydown', { key: '0' });
      document.dispatchEvent(keyDownEvent);
    });

    expect(mockSetInputText).not.toHaveBeenCalled();
  });

  it('should toggle dark mode when pressing "d"', () => {
    const { result } = renderHook(() =>
      useKeyboardHandlers(mockSetInputText, null, mockSetIsDarkMode, false)
    );

    act(() => {
      const keyDownEvent = new KeyboardEvent('keydown', { key: 'd' });
      document.dispatchEvent(keyDownEvent);
    });

    expect(mockSetIsDarkMode).toHaveBeenCalledWith(true);
    expect(result.current.activeKeys).toContain('d');

    act(() => {
      const keyUpEvent = new KeyboardEvent('keyup', { key: 'd' });
      document.dispatchEvent(keyUpEvent);
    });

    expect(result.current.activeKeys).not.toContain('d');
  });

  it('should ignore non-numeric keys except "d" and "Backspace"', () => {
    renderHook(() =>
      useKeyboardHandlers(mockSetInputText, '123', mockSetIsDarkMode, false)
    );

    act(() => {
      const keyDownEvent = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(keyDownEvent);
    });

    expect(mockSetInputText).not.toHaveBeenCalled();
  });

  it('should handle max input length', () => {
    renderHook(() =>
      useKeyboardHandlers(
        mockSetInputText,
        '12345678901234567890123456789012345678901234567890', // 50 characters
        mockSetIsDarkMode,
        false
      )
    );

    act(() => {
      const keyDownEvent = new KeyboardEvent('keydown', { key: '1' });
      document.dispatchEvent(keyDownEvent);
    });

    expect(mockSetInputText).not.toHaveBeenCalled();
  });
});
