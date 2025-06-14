export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter((input): input is string => typeof input === 'string').join(' ')
} 