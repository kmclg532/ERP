// Basic validation patterns - can be extended with Joi or Zod as needed

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

export const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return passwordRegex.test(password);
};

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    throw new Error(`${fieldName} is required`);
  }
  return true;
};

export const validateMinLength = (value, minLength, fieldName) => {
  if (String(value).length < minLength) {
    throw new Error(`${fieldName} must be at least ${minLength} characters`);
  }
  return true;
};

export const validateMaxLength = (value, maxLength, fieldName) => {
  if (String(value).length > maxLength) {
    throw new Error(`${fieldName} must not exceed ${maxLength} characters`);
  }
  return true;
};
