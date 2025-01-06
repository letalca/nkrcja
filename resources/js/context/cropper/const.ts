export const ACCEPTED_FILE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
] as const;
export const MAX_FILE_SIZE_IN_MB = 5;
export type FileTypes = (typeof ACCEPTED_FILE_TYPES)[number];
