interface ValidationError {
  isValid: boolean;
  message?: string;
}

export const validateUserInfo = (name: string, email: string): ValidationError => {
  if (!name || !email) {
    return {
      isValid: false,
      message: 'Name and email are required',
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: 'Invalid email format',
    };
  }

  return { isValid: true };
};