export function emailRegex(email: string): boolean {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
}
