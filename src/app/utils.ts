import deepClone from 'deep-clone';

// Because "clone" is neater and deepClone has a weird default export that make the linter all fussy
export const clone = deepClone;
