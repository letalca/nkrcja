<?php

declare(strict_types=1);

namespace App\Enums;

enum MembershipType: int
{
    use EnumExtension;

    case ClubMember = 0;
    case HonouraryMember = 1;
    case ProspectiveMember = 2;
    case Alumni = 3;

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
