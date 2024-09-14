interface ValidationError {
  isValid: boolean;
  message?: string;
}

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateUserUpdate = (name?: string, email?: string): ValidationResult => {
  if (name && name.length < 2) {
    return {
      isValid: false,
      message: 'Name must have at least 2 characters',
    };
  }

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        message: 'Invalid email format',
      };
    }
  }

  return { isValid: true };
};



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