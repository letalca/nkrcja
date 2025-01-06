import { ACCEPTED_FILE_TYPES, FileTypes } from './const';

class FileHandlerException extends Error {
    public title: string;
    constructor(title: string, message: string) {
        super(`${title}:${message}`);
        this.title = title;
        this.name = 'FileHandlerException';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, FileHandlerException);
        }
    }
}
type Crop = { width: number; height: number };
class FileHandler {
    private static readonly DEFAULT_MAX_DIMENSION = 2048;
    private _crop?: Crop;
    private _path?: string;
    private _ready: Promise<void>;

    public get path(): Promise<string> {
        return this._ready.then(() => {
            if (!this._path) {
                throw new FileHandlerException(
                    'File not found',
                    'Unable to load the specified file',
                );
            }
            return this._path;
        });
    }

    public get crop(): Promise<Crop> {
        return this._ready.then(() => {
            if (!this._crop) {
                throw new FileHandlerException(
                    'Crop not ready',
                    'Hmm... that was not supposed to happen.',
                );
            }
            return this._crop;
        });
    }
    public constructor(
        file: File,
        maxFileSizeMb: number,
        private maxImageDimension: number = FileHandler.DEFAULT_MAX_DIMENSION,
    ) {
        if (!ACCEPTED_FILE_TYPES.includes(file.type as FileTypes)) {
            throw new FileHandlerException(
                'Invalid File Type',
                'Please upload a valid image file (JPEG, PNG, or WebP)',
            );
        }
        if (file.size > maxFileSizeMb * 1024 * 1024) {
            throw new FileHandlerException(
                'File too large',
                `Image must be less than ${maxFileSizeMb}MB`,
            );
        }

        this._ready = new Promise((resolve, reject) => {
            const tempCrop = {
                height: 100,
                width: 100,
            };
            const reader = new FileReader();

            reader.onloadend = () => {
                const imagePath = reader.result as string;
                this._path = imagePath;

                const image = new Image();
                image.onload = () => {
                    function reducedBy(width: number, height: number): number {
                        const smaller = Math.min(width, height);
                        const larger = Math.max(width, height);
                        const reductionFraction = 1 - smaller / larger;
                        return 100 - reductionFraction * 100;
                    }

                    const { naturalHeight, naturalWidth } = image;
                    const reducedPercentage = reducedBy(
                        naturalWidth,
                        naturalHeight,
                    );

                    if (naturalHeight > naturalWidth) {
                        tempCrop.height = reducedPercentage;
                    } else if (naturalWidth > naturalHeight) {
                        tempCrop.width = reducedPercentage;
                    }

                    this._crop = tempCrop;
                    resolve();
                };

                image.onerror = () => {
                    reject(
                        new FileHandlerException(
                            'Image Load Error',
                            'Failed to load the image',
                        ),
                    );
                };

                image.src = imagePath;
            };

            reader.onerror = () => {
                reject(
                    new FileHandlerException(
                        'File Read Error',
                        'Failed to read the file',
                    ),
                );
            };
            this.optimizeImage(file).then((f) => reader.readAsDataURL(f));
        });
    }

    private optimizeImage = async (file: File): Promise<File> => {
        const image = new Image();
        image.src = URL.createObjectURL(file);

        await new Promise((resolve) => (image.onload = resolve));

        const maxDimension = 2048;
        let { width, height } = image;

        if (width > maxDimension || height > maxDimension) {
            const ratio = Math.min(
                this.maxImageDimension / width,
                this.maxImageDimension / height,
            );
            width *= ratio;
            height *= ratio;

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx?.drawImage(image, 0, 0, width, height);

            const blob = await new Promise<Blob>((resolve) =>
                canvas.toBlob((blob) => resolve(blob!), file.type, 0.9),
            );

            return new File([blob], file.name, { type: file.type });
        }

        return file;
    };
}
export { FileHandler, FileHandlerException };
