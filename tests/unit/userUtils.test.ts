import { validateUserInfo } from '../../src/utils/userUtils';

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
