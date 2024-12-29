<?php

declare(strict_types=1);

namespace App\Enums\Members;

use App\Actions\Members\SavePersonalDataAction;
use App\Actions\Members\SaveImageAction;
use App\Enums\EnumExtension;
use Exception;

enum FormType: string
{
    use EnumExtension;

    case PERSONAL = 'personal';
    case CONTACT = 'contact';
    case ADDRESS = 'address';
    case EDUCATION = 'education';
    case EMPLOYMENT = 'employment';
    case IMAGE = 'image';

    public function save(int $memberId): void
    {
        match ($this) {
            self::IMAGE => (new SaveImageAction($memberId))->execute(),
            self::PERSONAL => (new SavePersonalDataAction($memberId))->execute(),
            self::CONTACT => throw new Exception('Not yet implemented'),
            self::ADDRESS => throw new Exception('Not yet implemented'),
            self::EDUCATION => throw new Exception('Not yet implemented'),
            self::EMPLOYMENT => throw new Exception('Not yet implemented'),
        };
    }

    public function message(): string
    {
        return match ($this) {
            self::IMAGE => 'Image uploaded successfully!',
            self::PERSONAL => 'Data has been updated successfully.'
        };
    }
}
