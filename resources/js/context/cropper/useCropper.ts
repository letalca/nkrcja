import { useContext } from 'react';
import { ImageCropperContext } from './cropper-provider';

export const useCropper = () => {
    const context = useContext(ImageCropperContext);
    if (context === undefined) {
        throw new Error(
            'useRouterQuery must be used within a RouterQueryProvider',
        );
    }
    return context;
};
