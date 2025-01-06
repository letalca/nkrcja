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
import ReactCrop from 'react-image-crop';
import { useCropper } from './useCropper';

export interface ImageCropDialogRef {
    open: () => void;
    close: () => void;
}

export const ImageCropDialog = () => {
    const imgRef = useRef<HTMLImageElement>(null);

    const {
        cropDialogOpen,
        cancel,
        image,
        crop,
        setCrop,
        onCropComplete,
        aspectRatio,
    } = useCropper();
    const handleCropComplete = () => {
        if (imgRef.current) {
            onCropComplete(imgRef.current);
        }
    };
    return (
        <Dialog open={cropDialogOpen} onOpenChange={cancel}>
            <DialogContent
                className="max-w-xl"
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
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
                            onChange={(_, perc) => setCrop(perc)}
                            aspect={aspectRatio}
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
                                onClick={cancel}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleCropComplete}>Apply</Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};
