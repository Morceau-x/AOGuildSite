export const API_BASE_URL =
    process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:8000/' : 'https://api.tsf-albion.fr/';

export const DATE_TIME_FORMAT: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};
