import { useState } from 'react';
import { PercentCrop } from 'react-image-crop';
import { toast } from './use-toast';

interface ImageUploadProps {
    maxSize?: number;
    defaultImage?: string | null;
    onRemove?: () => void;
}

const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
type FileTypes = (typeof ACCEPTED_FILE_TYPES)[number];

export const useCropImage = (props: ImageUploadProps = {}) => {
    const { maxSize = 5, defaultImage = null, onRemove = () => {} } = props;

    const [crop, setCrop] = useState<PercentCrop>({
        unit: '%',
        width: 100,
        height: 100,
        x: 0,
        y: 0,
    });
    const [cropDialogOpen, setCropDialogOpen] = useState(false);
    const [tempImage, setTempImage] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(defaultImage);

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): boolean => {
        const file = event.target.files?.[0];

        if (!file) return false;

        if (!ACCEPTED_FILE_TYPES.includes(file.type as FileTypes)) {
            toast({
                title: 'Invalid file type',
                description:
                    'Please upload a valid image file (JPEG, PNG, or WebP)',
                variant: 'destructive',
            });
            return false;
        }
        // Math.min(file.);

        if (file.size > maxSize * 1024 * 1024) {
            toast({
                title: 'File too large',
                description: `Image must be less than ${maxSize}MB`,
                variant: 'destructive',
            });
            return false;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            const imagePath = reader.result as string;
            const _image = new Image();
            _image.onload = () => {
                function reducedBy(width: number, height: number): number {
                    const smaller = Math.min(width, height);
                    const larger = Math.max(width, height);
                    const reductionFraction = 1 - smaller / larger;
                    return 100 - reductionFraction * 100;
                }
                const { naturalHeight, naturalWidth } = _image;
                const _crop: PercentCrop = { ...crop };
                const reducedPercentage = reducedBy(
                    naturalWidth,
                    naturalHeight,
                );

                if (naturalHeight > naturalWidth) {
                    // height needs to be reduced
                    _crop.height = reducedPercentage;
                } else if (naturalWidth > naturalHeight) {
                    _crop.width = reducedPercentage;
                } else {
                    // both the same size so just let it stay at 100%
                }

                setCrop(_crop);
            };

            _image.src = imagePath;
            setTempImage(imagePath);
            setCropDialogOpen(true);
        };
        reader.readAsDataURL(file);
        return true;
    };

    const getCroppedImg = async (
        image: HTMLImageElement,
        crop: PercentCrop,
    ): Promise<string> => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

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
                    resolve(URL.createObjectURL(blob));
                },
                'image/jpeg',
                1,
            );
        });
    };

    const handleCropComplete = async (
        crop: PercentCrop,
        currentImage: HTMLImageElement | null,
    ) => {
        if (currentImage && tempImage) {
            const croppedImageUrl = await getCroppedImg(currentImage, crop);
            setPreview(croppedImageUrl);
            setCropDialogOpen(false);
            setTempImage(null);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        setTempImage(defaultImage);
        onRemove();
    };

    return {
        crop,
        setCrop,
        handleImageChange,
        handleCropComplete,
        preview,
        handleRemove,
        acceptedTypes: ACCEPTED_FILE_TYPES,
        cropDialogOpen,
        setCropDialogOpen,
        tempImage,
        setTempImage: (img: string | null) => setTempImage(img),
    };
};
