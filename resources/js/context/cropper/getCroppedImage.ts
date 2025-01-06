import { PercentCrop } from 'react-image-crop';

export const getCroppedImageUrl = async (
    image: HTMLImageElement,
    crop: PercentCrop,
): Promise<[string, File]> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Get original image type or default to jpeg
    const mimeType = image.src.startsWith('data:')
        ? image.src.split(';')[0].split(':')[1]
        : image.src.split('.').pop()?.toLowerCase()
          ? `image/${image.src.split('.').pop()?.toLowerCase()}`
          : 'image/jpeg';

    // Generate filename with timestamp and proper extension
    const extension = mimeType.split('/')[1] || 'jpeg';
    const timestamp = new Date().getTime();
    const filename = `${timestamp}.${extension}`;

    if (!ctx) {
        throw new Error('No 2d context');
    }

    const pixelCrop = {
        x: (crop.x * image.width) / 100,
        y: (crop.y * image.height) / 100,
        width: (crop.width * image.width) / 100,
        height: (crop.height * image.height) / 100,
    };

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
        image,
        pixelCrop.x * scaleX,
        pixelCrop.y * scaleY,
        pixelCrop.width * scaleX,
        pixelCrop.height * scaleY,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
    );

    // Convert to blob and return object URL
    return new Promise((resolve) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    throw new Error('Canvas is empty');
                }
                resolve([
                    URL.createObjectURL(blob),
                    new File([blob], filename, { type: mimeType }),
                ]);
            },
            mimeType,
            1,
        );
    });
};
