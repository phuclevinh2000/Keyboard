export const SEARCH_TYPE = {
  EXACT: 'exact',
  PREFIX: 'prefix',
};

export const MAX_INPUT_LENGTH = 50;

export type T9Key =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'backspace'
  | 'd';

export const KEYBOARD_LAYOUT: T9Key[][] = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['d', '0', 'backspace'],
];

export const T9_KEY_MAPPINGS: Record<T9Key, string[]> = {
  '1': [''],
  '2': ['a', 'b', 'c'],
  '3': ['d', 'e', 'f'],
  '4': ['g', 'h', 'i'],
  '5': ['j', 'k', 'l'],
  '6': ['m', 'n', 'o'],
  '7': ['p', 'q', 'r', 's'],
  '8': ['t', 'u', 'v'],
  '9': ['w', 'x', 'y', 'z'],
  '0': [''],
  backspace: [],
  d: [],
};

export const triggerModileWidth = 1000;
