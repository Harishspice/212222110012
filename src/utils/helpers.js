export const generateShortcode = () => Math.random().toString(36).substring(2, 8);
export const isValidUrl = (url) => /^https?:\/\/.+\..+/.test(url);
export const isAlphaNumeric = (str) => /^[a-z0-9]+$/i.test(str);