import { Button } from '@/components/button';
import ImageCropDialog from '@/components/image-crop-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCropImage } from '@/hooks/use-crop-image';
import { getInitials } from '@/lib/utils';
import { ClubMember, PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { IconUpload, IconX } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import { useFormContext } from '../../context/form/use-form-context';
import { api } from './api';

// TODO: implement dropzone
//https://github.com/shadcn-ui/ui/discussions/3188

type Props = PageProps<{ data: ClubMember }, { maxFileSize: number }>;

export default function ProfileImageUpload() {
    const maxSize = usePage<Props>().props.config.maxFileSize;
    const { setIsFormDirty, updateMember, member } = useFormContext();
    const {
        crop,
        setCrop,
        preview,
        handleRemove,
        handleImageChange,
        acceptedTypes,
        cropDialogOpen,
        setCropDialogOpen,
        handleCropComplete,
        tempImage,
        setTempImage,
    } = useCropImage({ maxSize: maxSize, defaultImage: member.images?.medium });

    const { setData, progress, post, processing } = useForm<{
        image: File | undefined | null;
    }>({ image: null });

    const setImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (handleImageChange(event)) {
            const file = event.target.files?.[0];
            setData('image', file);
            setIsFormDirty(true);
        }
    };

    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!preview) return;
        const clubMember = await api({
            form: 'image',
            memberId: member.id,
            post,
        });
        if (clubMember) {
            setIsFormDirty(false);
            updateMember(clubMember);
            // TODO: reset form
        }
    };

    const handleAvatarTrigger = () => {
        fileInputRef.current?.click();
    };
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getOffset = (loaded: number) => 440 - (440 * loaded) / 100;

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative mt-8">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="size-80 cursor-pointer"
                        onClick={handleAvatarTrigger}
                    >
                        {processing && progress && (
                            <div className="absolute inset-0 size-80">
                                <svg
                                    className="size-full"
                                    viewBox="0 0 144 144"
                                >
                                    <circle
                                        className="stroke-current text-muted"
                                        strokeWidth="4"
                                        fill="none"
                                        r="70"
                                        cx="72"
                                        cy="72"
                                    />
                                    <circle
                                        className="stroke-current text-primary"
                                        strokeWidth="4"
                                        fill="none"
                                        r="70"
                                        cx="72"
                                        cy="72"
                                        strokeLinecap="round"
                                        style={{
                                            strokeDasharray: 440,
                                            strokeDashoffset: getOffset(
                                                progress.loaded,
                                            ),
                                            transform: 'rotate(-90deg)',
                                            transformOrigin: '50% 50%',
                                        }}
                                    />
                                </svg>
                            </div>
                        )}
                        <div className="absolute inset-4">
                            <Avatar className="size-72">
                                <AvatarImage
                                    src={preview || undefined}
                                    className="object-cover"
                                />
                                <AvatarFallback className="text-2xl">
                                    {getInitials(member.name)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </motion.div>
                </div>

                <div className="flex space-x-3">
                    <label htmlFor="image-upload">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={acceptedTypes.join(',')}
                            onChange={setImage}
                            className="hidden"
                            id="image-upload"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            className="cursor-pointer"
                            asChild
                        >
                            <span>
                                <IconUpload className="h-4 w-4" />
                            </span>
                        </Button>
                    </label>
                    {preview && (
                        <Button
                            type="button"
                            variant="destructive"
                            className="cursor-pointer"
                            onClick={handleRemove}
                        >
                            <IconX className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                <p className="text-sm text-muted-foreground">
                    Accepted formats: JPEG, PNG, WebP. Max size: {maxSize}MB
                </p>

                {preview && (
                    <Button
                        onClick={handleUpload}
                        loading={processing}
                        className="mt-4"
                    >
                        {processing ? 'Uploading...' : 'Save Changes'}
                    </Button>
                )}
            </div>
            {tempImage && (
                <ImageCropDialog
                    open={cropDialogOpen}
                    crop={crop}
                    setCrop={setCrop}
                    image={tempImage}
                    setTempImage={setTempImage}
                    onOpenChange={(value: boolean) => setCropDialogOpen(value)}
                    onCropComplete={handleCropComplete}
                />
            )}
        </div>
    );
}
