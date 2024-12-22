<?php

declare(strict_types=1);

namespace App\Enums;

enum MembershipStatus: int
{
    use EnumExtension;

    case Active = 0;
    case Inactive = 1;
    case LeaveOfAbsence = 2;
    case Terminated = 3;
    case Resigned = 4;

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
