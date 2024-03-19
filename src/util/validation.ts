export const isNotEmpty = (value: string): boolean => {
  return String(value).trim().length !== 0;
};
export const isMinLength = (value: string, min: number): boolean => {
  return String(value).trim().length >= min;
};

export const isEmail = (value: string): boolean => {
  return !!String(value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const isEqual = (value: string, value2: string) => {
  return value === value2;
};
