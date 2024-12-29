<?php

declare(strict_types=1);

namespace App\Enums\Members;

use App\Enums\EnumExtension;

enum Type: int
{
    use EnumExtension;

    case ClubMember = 0;
    case HonouraryMember = 1;
    case ProspectiveMember = 2;
    case Alumni = 3;

    public static function asSelectable(?Type $status = null, bool $withDefault = true): array | null
    {
        if ( ! $status) {
            return $withDefault ?
            [
                'value' => static::ProspectiveMember->value,
                'label' => static::ProspectiveMember->getLabel(),
            ] : null;
        }
        return [
            'value' => $status->value,
            'label' => $status->getLabel(),
        ];
    }

    public function getLabel(): string
    {
        return match ($this) {
            self::ClubMember => 'Club Member',
            self::HonouraryMember => 'Honourary Member',
            self::ProspectiveMember => 'Prospective Member',
            self::Alumni => 'Alumni',
        };
    }
}
