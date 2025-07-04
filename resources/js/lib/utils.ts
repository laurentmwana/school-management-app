import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const isMenuActive = (href?: string): boolean => {
    const path = window.location.pathname
    if (!href) return false;
    if (href === "/") {
        return path === "/";
    }
    return path.startsWith(href) || href.includes(path);
};



export const getInitials = (content: string) => {
  if (!content) return null;

  return content
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

export function excerpt(
  text?: string,
  limit: number = 100,
  separator: string = "..."
): string | null {
  if (!text || typeof text !== "string") return "";

  if (text.length <= limit) {
    return text;
  }
  if (!text) return null;

  let truncated = text.substring(0, limit);

  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex > 0) {
    truncated = truncated.substring(0, lastSpaceIndex);
  }

  return truncated + separator;
}

export const formatDate = (dateString: string | null) => {
  const date = new Date(dateString ? dateString : "now");
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};
