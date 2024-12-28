<?php

declare(strict_types=1);

namespace App\Actions\Members;

use App\Models\Member;

class SaveImageAction
{
    public function __construct(private readonly int $memberId) {}
    public function execute(): void
    {
        $member = Member::with('media')->findOrFail($this->memberId);
        $max_file_size = config()->integer('media-library.max_file_size') / 1024;
        request()->validate([
            'image' => [
                'required',
                'image',
                'mimes:jpeg,png,jpg',
                "max:{$max_file_size}",
            ],
        ]);

        if ($member->hasMedia(Member::$mediaKey)) {
            $member->clearMediaCollection(Member::$mediaKey);
        }

        $member
            ->addMediaFromRequest('image')
            ->toMediaCollection(Member::$mediaKey);
    }
}
