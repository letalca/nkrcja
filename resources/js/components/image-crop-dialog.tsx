import { Button } from '@/components/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useRef } from 'react';
import ReactCrop, { Crop, PercentCrop } from 'react-image-crop';

export interface ImageCropDialogProps {
    open?: boolean;
    onOpenChange: (value: boolean) => void;
    image?: string | null;
    onCropComplete: (
        croppedArea: PercentCrop,
        currentImage: HTMLImageElement,
    ) => void;
    crop: Crop;
    setCrop: (crop: PercentCrop) => void;
    setTempImage: (img: string | null) => void;
}

export interface ImageCropDialogRef {
    open: () => void;
    close: () => void;
}

export default function ImageCropDialog(props: ImageCropDialogProps) {
    const {
        open = false,
        onOpenChange,
        image = null,
        onCropComplete,
        crop,
        setCrop,
        setTempImage,
    } = props;

    const imgRef = useRef<HTMLImageElement>(null);
    const handleCropComplete = (crop: PercentCrop) => {
        if (imgRef.current) {
            onCropComplete(crop, imgRef.current);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl">
                <VisuallyHidden asChild>
                    <DialogDescription />
                </VisuallyHidden>
                <DialogHeader>
                    <DialogTitle>Crop Image</DialogTitle>
                </DialogHeader>
                {image && (
                    <div className="space-y-4">
                        <ReactCrop
                            crop={crop}
                            onChange={(pix, perc) => setCrop(perc)}
                            aspect={1}
                            circularCrop={false}
                        >
                            <img
                                ref={imgRef}
                                src={image}
                                alt="Crop preview"
                                className="max-h-[60vh] w-auto"
                            />
                        </ReactCrop>
                        <div className="flex justify-end space-x-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    onOpenChange(false);
                                    setTempImage(null);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    if (imgRef.current) {
                                        handleCropComplete(crop as PercentCrop);
                                    }
                                }}
                            >
                                Apply
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
