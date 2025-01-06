import { toast } from '@/hooks/useToast';
import {
    ChangeEvent,
    createContext,
    forwardRef,
    InputHTMLAttributes,
    PropsWithChildren,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { PercentCrop } from 'react-image-crop';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE_IN_MB } from './const';
import { FileHandler, FileHandlerException } from './file-handler';
import { getCroppedImageUrl } from './getCroppedImage';
import { ImageCropDialog } from './image-crop-dialog';

type AspectRatioType = 'square' | 'landscape' | 'portrait' | number;

type ImageCropContext = {
    cropDialogOpen: boolean;
    cancel: () => void;
    image: string | null;
    crop: PercentCrop;
    setCrop: (crop: PercentCrop) => void;
    onCropComplete: (image: HTMLImageElement) => Promise<void>;
    aspectRatio: number;
};

export const ImageCropperContext = createContext<ImageCropContext | undefined>(
    undefined,
);

type Props = PropsWithChildren & InputHTMLAttributes<HTMLInputElement>;

interface ImageCropperProps extends Props {
    acceptedTypes?: string[];
    onCropCompleted: (url: string | null) => void;
    maxFileSizeMb?: number;
    setFileData?: (file: File) => void;
    aspectRatio?: AspectRatioType;
}

export interface ImageCropperHandle {
    triggerFileInput: () => void;
    clear: () => void;
}

export const ImageCropper = forwardRef<ImageCropperHandle, ImageCropperProps>(
    (
        {
            children,
            className,
            acceptedTypes = ACCEPTED_FILE_TYPES,
            maxFileSizeMb = MAX_FILE_SIZE_IN_MB,
            id = 'image-upload',
            onCropCompleted,
            aspectRatio = 'square',
            setFileData,
            ...imageProps
        },
        ref,
    ) => {
        const [tempImage, setTempImage] = useState<string | null>(null);
        const [preview, setPreview] = useState<string | null>(null);
        const calculateDefaultCrop = (
            aspectRatio: AspectRatioType,
        ): PercentCrop => {
            const ratio =
                typeof aspectRatio === 'number'
                    ? aspectRatio
                    : aspectRatio === 'landscape'
                      ? 16 / 9
                      : aspectRatio === 'portrait'
                        ? 9 / 16
                        : 1;

            const width = 100;
            const height = width / ratio;

            return {
                unit: '%',
                width,
                height: Math.min(height, 100),
                x: 0,
                y: (100 - Math.min(height, 100)) / 2,
            };
        };
        const fileInputRef = useRef<HTMLInputElement>(null);
        const [crop, setCrop] = useState<PercentCrop>(
            calculateDefaultCrop(aspectRatio),
        );

        useEffect(() => {
            if (preview && tempImage) {
                setTempImage(null);
            }
            return () => {
                if (tempImage && !tempImage.startsWith('data:'))
                    URL.revokeObjectURL(tempImage);
            };
        }, [preview, tempImage]);

        const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
            try {
                const file = event.target.files?.[0];
                if (!file)
                    throw new FileHandlerException('Error', 'No file selected');

                const fileHandler = new FileHandler(file, maxFileSizeMb);
                const [tempCrop, path] = await Promise.all([
                    fileHandler.crop,
                    fileHandler.path,
                ]);

                setCrop((prev) => ({
                    ...prev,
                    height: tempCrop.height,
                    width: tempCrop.width,
                }));
                setTempImage(path);
                setPreview(null);
            } catch (error) {
                const errorMessage =
                    error instanceof FileHandlerException
                        ? { title: error.title, message: error.message }
                        : {
                              title: 'Error',
                              message: 'Failed to process image',
                          };

                toast(errorMessage);
            }
        };

        const handleDrop = async (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const file = e.dataTransfer.files?.[0];
            if (file) {
                const input = fileInputRef.current;
                if (input) {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    input.files = dataTransfer.files;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    handleChange({ target: input } as any);
                }
            }
        };

        const onCropComplete = async (
            image: HTMLImageElement,
        ): Promise<void> => {
            const [croppedImageUrl, file] = await getCroppedImageUrl(
                image,
                crop,
            );
            setFileData?.(file);
            setPreview(croppedImageUrl);
            onCropCompleted(croppedImageUrl);
        };

        useImperativeHandle(ref, () => ({
            preview: preview,
            clear: () => {
                setPreview(null);
                onCropCompleted(null);
            },
            triggerFileInput: () => {
                if (fileInputRef.current) {
                    fileInputRef.current.click();
                }
            },
        }));

        return (
            <ImageCropperContext.Provider
                value={{
                    cropDialogOpen: Boolean(tempImage),
                    cancel: () => {
                        setTempImage(null);
                    },
                    crop: crop,
                    image: tempImage,
                    onCropComplete,
                    setCrop: (crop) => setCrop(crop),
                    aspectRatio: aspectRatio === 'square' ? 1 : 16 / 9,
                }}
            >
                <label
                    htmlFor={id}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={acceptedTypes.join(',')}
                        className={className}
                        id={id}
                        onChange={handleChange}
                        {...imageProps}
                    />
                    {children}
                </label>
                <ImageCropDialog />
            </ImageCropperContext.Provider>
        );
    },
);

ImageCropper.displayName = 'ImageCropper';
