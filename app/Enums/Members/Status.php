<?php

declare(strict_types=1);

namespace App\Enums\Members;

use App\Enums\EnumExtension;
use Illuminate\Support\Collection;

enum Status: int
{
    use EnumExtension;

    case Active = 0;
    case Inactive = 1;
    case LeaveOfAbsence = 2;
    case Terminated = 3;
    case Resigned = 4;

    public static function getValidMembers(): Collection
    {
        return collect([static::Active, static::Inactive, static::LeaveOfAbsence]);
    }

    public static function asSelectable(?Status $status = null): array | null
    {
        if ( ! $status) {
            return null;
        }
        return [
            'value' => $status->value,
            'label' => $status->getLabel(),
        ];
    }

    public function getLabel(): string
    {
        return match ($this) {
            self::Active => 'Active',
            self::Inactive => 'Inactive',
            self::LeaveOfAbsence => 'LOA',
            self::Terminated => 'Terminated',
            self::Resigned => 'Resigned',
        };
    }
}
