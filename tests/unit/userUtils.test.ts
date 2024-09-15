import { validateUserInfo, validateUserUpdate } from '../../src/utils/userUtils';

describe('validateUserInfo', () => {
  it('should return false if name is missing', () => {
    const result = validateUserInfo('', 'test@example.com');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Name and email are required');
  });

  it('should return false if email is missing', () => {
    const result = validateUserInfo('John Doe', '');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Name and email are required');
  });

  it('should return false if email format is invalid', () => {
    const result = validateUserInfo('John Doe', 'invalid-email');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Invalid email format');
  });

  it('should return true if name and email are valid', () => {
    const result = validateUserInfo('John Doe', 'test@example.com');
    expect(result.isValid).toBe(true);
    expect(result.message).toBeUndefined();
  });
});

describe('validateUserUpdate', () => {
  it('should return false if name is less than 2 characters', () => {
    const result = validateUserUpdate('J', 'test@example.com');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Name must have at least 2 characters');
  });

  it('should return false if email format is invalid', () => {
    const result = validateUserUpdate('John Doe', 'invalid-email');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Invalid email format');
  });

  it('should return true if name is valid and email is valid', () => {
    const result = validateUserUpdate('John Doe', 'test@example.com');
    expect(result.isValid).toBe(true);
    expect(result.message).toBeUndefined();
  });

  it('should return true if name is not provided but email is valid', () => {
    const result = validateUserUpdate(undefined, 'test@example.com');
    expect(result.isValid).toBe(true);
    expect(result.message).toBeUndefined();
  });

  it('should return true if email is not provided but name is valid', () => {
    const result = validateUserUpdate('John Doe', undefined);
    expect(result.isValid).toBe(true);
    expect(result.message).toBeUndefined();
  });

  it('should return true if neither name nor email is provided', () => {
    const result = validateUserUpdate(undefined, undefined);
    expect(result.isValid).toBe(true);
    expect(result.message).toBeUndefined();
  });
});
