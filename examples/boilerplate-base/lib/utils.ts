import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Regex to remove 'www.' prefix from domain
const WWW_REGEX = /^www\./;

export const getDomain = (url: string) => {
  try {
    // Add https:// protocol if not present
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
    const domain = new URL(urlWithProtocol).hostname;
    // Remove 'www.' prefix if exists
    return domain.replace(WWW_REGEX, '');
  } catch (_error) {
    // Return original input if URL parsing fails
    return url;
  }
};
