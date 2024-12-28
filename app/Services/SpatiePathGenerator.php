<?php

declare(strict_types=1);

namespace App\Services;

use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator;

class SpatiePathGenerator implements PathGenerator
{
    public function getPath(Media $media): string
    {
        return $this->getMediaPath($media);
    }
    public function getPathForConversions(Media $media): string
    {
        return $this->getMediaPath($media, '/conversions/');
    }
    public function getPathForResponsiveImages(Media $media): string
    {
        return $this->getMediaPath($media, '/responsive-images/');
    }

    private function getMediaPath(Media $media, string $path = '/'): string
    {
        $prefix = config('media-library.prefix');
        $mediaPath = md5($media->id . config('app.key')) . $path;

        if ('' !== $prefix) {
            $mediaPath = $prefix . '/' . $mediaPath;
        }

        return $mediaPath;
    }
}
