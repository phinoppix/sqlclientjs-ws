export const isInteger = (value: any): boolean => Number.isInteger(value);

export const isFloat = (value: any): boolean =>
  typeof value === 'number' && !Number.isInteger(value);

export const isBool = (value: any): boolean =>
  value === true || value === false;
