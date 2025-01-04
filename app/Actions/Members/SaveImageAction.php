<?php

declare(strict_types=1);

namespace App\Actions\Members;

use App\Actions\Contracts\SaveMemberDetailsAction;
use App\Exceptions\Memebers\SaveMembershipDataException;
use App\Models\Member;
use Exception;
use Illuminate\Support\Facades\DB;

class SaveImageAction extends SaveMemberDetailsAction
{
    private const ALLOWED_MIMES = ['jpeg', 'png', 'jpg'];

    public static function rules(): array
    {
        $maxFileSize  = config()->integer('media-library.max_file_size') / 1024;
        return [
            'image' => [
                'required',
                'image',
                'mimes:' . implode(',', self::ALLOWED_MIMES),
                "max:{$maxFileSize}",
            ],
        ];
    }

    public function execute(array $validated): void
    {
        try {
            DB::transaction(function (): void {
                if ($this->member->hasMedia(Member::$mediaKey)) {
                    $this->member->clearMediaCollection(Member::$mediaKey);
                }

                $this->member
                    ->addMediaFromRequest('image')
                    ->toMediaCollection(Member::$mediaKey);
            });
        } catch (Exception $e) {
            logger()->error('Failed to save member image', [
                'member_id' => $this->member->id,
                'error' => $e->getMessage(),
            ]);

            throw new SaveMembershipDataException(
                'Failed to upload image',
                previous: $e,
            );
        }
    }
}
