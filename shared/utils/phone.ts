export function isValidPhone(value: string): boolean {
  const phone = value.trim();
  const digits = phone.replace(/\D/g, '');
  return phone.length <= 50 && /^\+?[\d\s()-]+$/.test(phone) && digits.length >= 7 && digits.length <= 15;
}
